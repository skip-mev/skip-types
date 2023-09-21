/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Params } from "./genesis";

export const protobufPackage = "sdk.auction.v1";

/**
 * MsgAuctionBid defines a request type for sending bids to the x/auction
 * module.
 */
export interface MsgAuctionBid {
  /**
   * bidder is the address of the account that is submitting a bid to the
   * auction.
   */
  bidder: string;
  /**
   * bid is the amount of coins that the bidder is bidding to participate in the
   * auction.
   */
  bid:
    | Coin
    | undefined;
  /**
   * transactions are the bytes of the transactions that the bidder wants to
   * bundle together.
   */
  transactions: Uint8Array[];
}

/** MsgAuctionBidResponse defines the Msg/AuctionBid response type. */
export interface MsgAuctionBidResponse {
}

/**
 * MsgUpdateParams defines a request type for updating the x/auction module
 * parameters.
 */
export interface MsgUpdateParams {
  /**
   * authority is the address of the account that is authorized to update the
   * x/auction module parameters.
   */
  authority: string;
  /** params is the new parameters for the x/auction module. */
  params: Params | undefined;
}

/** MsgUpdateParamsResponse defines the Msg/UpdateParams response type. */
export interface MsgUpdateParamsResponse {
}

function createBaseMsgAuctionBid(): MsgAuctionBid {
  return { bidder: "", bid: undefined, transactions: [] };
}

export const MsgAuctionBid = {
  encode(message: MsgAuctionBid, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bidder !== "") {
      writer.uint32(10).string(message.bidder);
    }
    if (message.bid !== undefined) {
      Coin.encode(message.bid, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.transactions) {
      writer.uint32(26).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAuctionBid {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAuctionBid();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.bidder = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.bid = Coin.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.transactions.push(reader.bytes());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAuctionBid {
    return {
      bidder: isSet(object.bidder) ? String(object.bidder) : "",
      bid: isSet(object.bid) ? Coin.fromJSON(object.bid) : undefined,
      transactions: Array.isArray(object?.transactions) ? object.transactions.map((e: any) => bytesFromBase64(e)) : [],
    };
  },

  toJSON(message: MsgAuctionBid): unknown {
    const obj: any = {};
    if (message.bidder !== "") {
      obj.bidder = message.bidder;
    }
    if (message.bid !== undefined) {
      obj.bid = Coin.toJSON(message.bid);
    }
    if (message.transactions?.length) {
      obj.transactions = message.transactions.map((e) => base64FromBytes(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAuctionBid>, I>>(base?: I): MsgAuctionBid {
    return MsgAuctionBid.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAuctionBid>, I>>(object: I): MsgAuctionBid {
    const message = createBaseMsgAuctionBid();
    message.bidder = object.bidder ?? "";
    message.bid = (object.bid !== undefined && object.bid !== null) ? Coin.fromPartial(object.bid) : undefined;
    message.transactions = object.transactions?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgAuctionBidResponse(): MsgAuctionBidResponse {
  return {};
}

export const MsgAuctionBidResponse = {
  encode(_: MsgAuctionBidResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAuctionBidResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAuctionBidResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgAuctionBidResponse {
    return {};
  },

  toJSON(_: MsgAuctionBidResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAuctionBidResponse>, I>>(base?: I): MsgAuctionBidResponse {
    return MsgAuctionBidResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAuctionBidResponse>, I>>(_: I): MsgAuctionBidResponse {
    const message = createBaseMsgAuctionBidResponse();
    return message;
  },
};

function createBaseMsgUpdateParams(): MsgUpdateParams {
  return { authority: "", params: undefined };
}

export const MsgUpdateParams = {
  encode(message: MsgUpdateParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): MsgUpdateParams {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(base?: I): MsgUpdateParams {
    return MsgUpdateParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(object: I): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}

export const MsgUpdateParamsResponse = {
  encode(_: MsgUpdateParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateParamsResponse {
    return {};
  },

  toJSON(_: MsgUpdateParamsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(base?: I): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(_: I): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
};

/** Msg defines the x/auction Msg service. */
export interface Msg {
  /** AuctionBid defines a method for sending bids to the x/auction module. */
  AuctionBid(request: MsgAuctionBid): Promise<MsgAuctionBidResponse>;
  /**
   * UpdateParams defines a governance operation for updating the x/auction
   * module parameters. The authority is hard-coded to the x/gov module account.
   */
  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}

export const MsgServiceName = "sdk.auction.v1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.AuctionBid = this.AuctionBid.bind(this);
    this.UpdateParams = this.UpdateParams.bind(this);
  }
  AuctionBid(request: MsgAuctionBid): Promise<MsgAuctionBidResponse> {
    const data = MsgAuctionBid.encode(request).finish();
    const promise = this.rpc.request(this.service, "AuctionBid", data);
    return promise.then((data) => MsgAuctionBidResponse.decode(_m0.Reader.create(data)));
  }

  UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateParams", data);
    return promise.then((data) => MsgUpdateParamsResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
