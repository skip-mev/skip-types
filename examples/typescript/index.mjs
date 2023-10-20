import { MsgAuctionBid } from "skip-types/build/pob/builder/v1/tx.js";
import { SigningCosmWasmClientWithTimeout } from "skip-types/build/util/index.js";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx.js'
import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx.js'

const MNEMONIC = "...";
const RPC_ENDPOINT = "https://juno-rpc.polkachu.com";

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

    async function bundle(height) {    
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
      
      const txRaw = await client.signWithTimeout(
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
        height,
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
        height,
        {
          accountNumber: accountNumber,
          sequence: sequence,
          chainId: "juno-1",
        },
      );

      return txAuctionRaw
    }

    // Bundle is sent with height + 1 and height + 2 to ensure timely processing.
    const [r1, r2] = await Promise.allSettled([
      client.forceGetTmClient().broadcastTxSync({
        tx: TxRaw.encode(await bundle(currentBlockHeight + 1)).finish(),
      }), 
      client.forceGetTmClient().broadcastTxSync({
        tx: TxRaw.encode(await bundle(currentBlockHeight + 2)).finish(),
      })
    ])

    let r;

    if (r1.value?.code === 0) {
      r = r1.value
    } else if (r2.value?.code === 0) {
      r = r2.value
    }

    if (r) {
      console.log(Buffer.from(r.hash).toString("hex").toUpperCase());
    } else {
      console.error(r1, r2);
    }

}


main();
