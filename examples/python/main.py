from cosmpy.aerial.client import LedgerClient, NetworkConfig
from cosmpy.aerial.wallet import LocalWallet
from cosmpy.aerial.tx import Transaction as Tx, SigningCfg
from cosmpy.crypto.keypairs import PrivateKey

from cosmpy.protos.cosmos.bank.v1beta1.tx_pb2 import MsgSend
from cosmpy.protos.cosmos.base.v1beta1.coin_pb2 import Coin

from skip_types.pob import MsgAuctionBid
from skip_utility.tx import TransactionWithTimeout as TxWithTimeout

from rest_client import FixedTxRestClient
from bip_utils import Bip39SeedGenerator, Bip44, Bip44Coins
import httpx


def create_wallet(mnemonic: str, address_prefix: str) -> LocalWallet:
    seed_bytes = Bip39SeedGenerator(mnemonic).Generate()
    bip44_def_ctx = Bip44.FromSeed(seed_bytes,
                                   Bip44Coins.COSMOS).DeriveDefaultPath()
    return LocalWallet(
        PrivateKey(
            bip44_def_ctx.PrivateKey().Raw().ToBytes()),
        prefix=address_prefix)


def query_block_height() -> int:
    response = httpx.get(
        rest_url + "cosmos/base/tendermint/v1beta1/blocks/latest")
    result = response.json()

    return int(result["block"]["header"]["height"])


mnemonic = "..."

chain_id = "juno-1"
rest_url = "https://lcd-juno.validavia.me/"
gas_price = 0.075
fee_denom = "ujuno"
address_prefix = "juno"
minimum_bid = 1000000

network_config = NetworkConfig(
    chain_id=chain_id,
    url=f"rest+{rest_url}",
    fee_minimum_gas_price=gas_price,
    fee_denomination=fee_denom,
    staking_denomination=fee_denom,
)


client = LedgerClient(network_config)
client.txs = FixedTxRestClient(client.txs.rest_client)
wallet = create_wallet(mnemonic, address_prefix)
height = query_block_height()

selfPayTestTx = TxWithTimeout()
msgs = []
address = str(wallet.address())

# test tx to send yourself 1 base denom
selfPayTestTx.add_message(
    MsgSend(
        from_address=address,
        to_address=address,
        amount=[Coin(amount=str(1),
                     denom=fee_denom)]
    )
)

account = client.query_account(address=address)

gas_limit = 300000
fee = f"{int(gas_price * gas_limit)}{fee_denom}"
selfPayTestTx.seal(
    signing_cfgs=[
        SigningCfg.direct(
            wallet.public_key(),
            account.sequence+1)],  # Sign with sequence + 1 since this is our backrun tx
    fee=fee,
    gas_limit=gas_limit,
    timeout_height=height+2
)
selfPayTestTx.sign(
    wallet.signer(),
    chain_id,
    account.number
)
selfPayTestTx.complete()

bundle = [
    selfPayTestTx.tx.SerializeToString()
]

bidTx = TxWithTimeout()

# Create the bid message
msg = MsgAuctionBid(
    bidder=address,
    bid=Coin(amount=str(minimum_bid),
             denom=fee_denom),
    transactions=bundle,
)
bidTx.add_message(msg)

bidTx.seal(
    signing_cfgs=[SigningCfg.direct(
        wallet.public_key(), account.sequence)],
    fee=fee,
    gas_limit=gas_limit,
    timeout_height=height+2
)

bidTx.sign(
    wallet.signer(),
    chain_id,
    account.number
)

bidTx.complete()

tx = client.broadcast_tx(tx=bidTx)
print(f"Broadcasted bid transaction {tx.tx_hash}")
