import type * as grpc from "@grpc/grpc-js";
import type { MessageTypeDefinition } from "@grpc/proto-loader";

import type {
  ConnectionClient as _connectionPackage_ConnectionClient,
  ConnectionDefinition as _connectionPackage_ConnectionDefinition,
} from "./connectionPackage/Connection";

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ConnectionProtoGrpcType {
  connectionPackage: {
    ConnectRequest: MessageTypeDefinition;
    ConnectResponse: MessageTypeDefinition;
    Connection: SubtypeConstructor<
      typeof grpc.Client,
      _connectionPackage_ConnectionClient
    > & { service: _connectionPackage_ConnectionDefinition };
  };
}
