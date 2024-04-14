import type * as grpc from "@grpc/grpc-js";
import type { MessageTypeDefinition } from "@grpc/proto-loader";

import type {
  ChatStreamClient as _chatPackage_ChatStreamClient,
  ChatStreamDefinition as _chatPackage_ChatStreamDefinition,
} from "./chatPackage/ChatStream";

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ChatProtoGrpcType {
  chatPackage: {
    ChatRequest: MessageTypeDefinition;
    ChatResponse: MessageTypeDefinition;
    ChatStream: SubtypeConstructor<
      typeof grpc.Client,
      _chatPackage_ChatStreamClient
    > & { service: _chatPackage_ChatStreamDefinition };
  };
}
