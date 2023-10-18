import { MsgAuctionBid } from "skipjs-types/build/pob/builder/v1/tx.js";
import { SigningCosmWasmClientWithTimeout } from "skipjs-types/build/util/index.js";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx.js'
import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx.js'

const MNEMONIC = "...";
const RPC_ENDPOINT = "https://juno-rpc.reece.sh";

async function main() {
    const signer = await DirectSecp256k1HdWallet.fromMnemonic(MNEMONIC, {
        prefix: "juno"
    });

    const client = await SigningCosmWasmClientWithTimeout.connectWithSigner(
        RPC_ENDPOINT,
        signer
    );

    const [account] = await signer.getAccounts();
    const myAddress = account.address;
    const currentBlockHeight = (await client.getBlock()).header.height;

    const { accountNumber, sequence } = await client.getSequence(myAddress);
    
    const transferMyselfNative = {
      typeUrl: '/cosmos.bank.v1beta1.MsgSend',
      value: MsgSend.fromPartial({
        amount: [
          {
            amount: '1',
            denom: 'ujuno',
          },
        ],
        fromAddress: myAddress,
        toAddress: myAddress,
      }),
    };
    
    const msgs = [transferMyselfNative];
    
    const txRaw = await client.sign(
      myAddress,
      msgs,
      {
        amount: [
          {
            amount: '75000',
            denom: 'ujuno',
          },
        ],
        gas: '1000000',
      },
      '',
      {
        accountNumber: accountNumber,
        sequence: sequence + 1,
        chainId: "juno-1",
      },
    );
    
    const auction = {
      typeUrl: '/pob.builder.v1.MsgAuctionBid',
    
      value: MsgAuctionBid.fromPartial({
        bid: {
          amount: '1000000',
          denom: 'ujuno',
        },
        bidder: myAddress,
        transactions: [TxRaw.encode(txRaw).finish()],
      }),
    };
    
    const txAuctionRaw = await client.signWithTimeout(
      myAddress,
      [auction],
      {
        amount: [
          {
            amount: '75000',
            denom: 'ujuno',
          },
        ],
        gas: '1000000',
      },
      '',
      currentBlockHeight + 2,
      {
        accountNumber: accountNumber,
        sequence: sequence,
        chainId: "juno-1",
      },
    );
    
    const r = await client.forceGetTmClient().broadcastTxSync({
      tx: TxRaw.encode(txAuctionRaw).finish(),
    });
    
    if (r.code !== 0) {
      console.error(r);
    } else {
      console.log(toHex(r.hash).toUpperCase());
    }
}


main();
