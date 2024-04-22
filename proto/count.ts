import type * as grpc from "@grpc/grpc-js";
import type { MessageTypeDefinition } from "@grpc/proto-loader";

import type {
  CountClient as _countPackage_CountClient,
  CountDefinition as _countPackage_CountDefinition,
} from "./countPackage/Count";

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

export interface CountProtoGrpcType {
  countPackage: {
    Count: SubtypeConstructor<typeof grpc.Client, _countPackage_CountClient> & {
      service: _countPackage_CountDefinition;
    };
    CountRequest: MessageTypeDefinition;
    CountResponse: MessageTypeDefinition;
  };
}
