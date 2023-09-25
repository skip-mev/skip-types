/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "pob.builder.v1";

/** GenesisState defines the genesis state of the x/builder module. */
export interface GenesisState {
  params: Params | undefined;
}

/** Params defines the parameters of the x/builder module. */
export interface Params {
  /**
   * max_bundle_size is the maximum number of transactions that can be bundled
   * in a single bundle.
   */
  maxBundleSize: number;
  /**
   * escrow_account_address is the address of the account that will receive a
   * portion of the bid proceeds.
   */
  escrowAccountAddress: Uint8Array;
  /** reserve_fee specifies the bid floor for the auction. */
  reserveFee:
    | Coin
    | undefined;
  /**
   * min_bid_increment specifies the minimum amount that the next bid must be
   * greater than the previous bid.
   */
  minBidIncrement:
    | Coin
    | undefined;
  /**
   * front_running_protection specifies whether front running and sandwich
   * attack protection is enabled.
   */
  frontRunningProtection: boolean;
  /**
   * proposer_fee defines the portion of the winning bid that goes to the block
   * proposer that proposed the block.
   */
  proposerFee: string;
}

function createBaseGenesisState(): GenesisState {
  return { params: undefined };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseParams(): Params {
  return {
    maxBundleSize: 0,
    escrowAccountAddress: new Uint8Array(0),
    reserveFee: undefined,
    minBidIncrement: undefined,
    frontRunningProtection: false,
    proposerFee: "",
  };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.maxBundleSize !== 0) {
      writer.uint32(8).uint32(message.maxBundleSize);
    }
    if (message.escrowAccountAddress.length !== 0) {
      writer.uint32(18).bytes(message.escrowAccountAddress);
    }
    if (message.reserveFee !== undefined) {
      Coin.encode(message.reserveFee, writer.uint32(26).fork()).ldelim();
    }
    if (message.minBidIncrement !== undefined) {
      Coin.encode(message.minBidIncrement, writer.uint32(34).fork()).ldelim();
    }
    if (message.frontRunningProtection === true) {
      writer.uint32(40).bool(message.frontRunningProtection);
    }
    if (message.proposerFee !== "") {
      writer.uint32(50).string(message.proposerFee);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.maxBundleSize = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.escrowAccountAddress = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.reserveFee = Coin.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.minBidIncrement = Coin.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.frontRunningProtection = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.proposerFee = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      maxBundleSize: isSet(object.maxBundleSize) ? Number(object.maxBundleSize) : 0,
      escrowAccountAddress: isSet(object.escrowAccountAddress)
        ? bytesFromBase64(object.escrowAccountAddress)
        : new Uint8Array(0),
      reserveFee: isSet(object.reserveFee) ? Coin.fromJSON(object.reserveFee) : undefined,
      minBidIncrement: isSet(object.minBidIncrement) ? Coin.fromJSON(object.minBidIncrement) : undefined,
      frontRunningProtection: isSet(object.frontRunningProtection) ? Boolean(object.frontRunningProtection) : false,
      proposerFee: isSet(object.proposerFee) ? String(object.proposerFee) : "",
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.maxBundleSize !== 0) {
      obj.maxBundleSize = Math.round(message.maxBundleSize);
    }
    if (message.escrowAccountAddress.length !== 0) {
      obj.escrowAccountAddress = base64FromBytes(message.escrowAccountAddress);
    }
    if (message.reserveFee !== undefined) {
      obj.reserveFee = Coin.toJSON(message.reserveFee);
    }
    if (message.minBidIncrement !== undefined) {
      obj.minBidIncrement = Coin.toJSON(message.minBidIncrement);
    }
    if (message.frontRunningProtection === true) {
      obj.frontRunningProtection = message.frontRunningProtection;
    }
    if (message.proposerFee !== "") {
      obj.proposerFee = message.proposerFee;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.maxBundleSize = object.maxBundleSize ?? 0;
    message.escrowAccountAddress = object.escrowAccountAddress ?? new Uint8Array(0);
    message.reserveFee = (object.reserveFee !== undefined && object.reserveFee !== null)
      ? Coin.fromPartial(object.reserveFee)
      : undefined;
    message.minBidIncrement = (object.minBidIncrement !== undefined && object.minBidIncrement !== null)
      ? Coin.fromPartial(object.minBidIncrement)
      : undefined;
    message.frontRunningProtection = object.frontRunningProtection ?? false;
    message.proposerFee = object.proposerFee ?? "";
    return message;
  },
};

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
