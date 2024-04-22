import type * as grpc from "@grpc/grpc-js";
import type { MessageTypeDefinition } from "@grpc/proto-loader";

import type {
  SetSubjectClient as _subjectPackage_SetSubjectClient,
  SetSubjectDefinition as _subjectPackage_SetSubjectDefinition,
} from "./subjectPackage/SetSubject";

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

export interface SubjectProtoGrpcType {
  subjectPackage: {
    SetSubject: SubtypeConstructor<
      typeof grpc.Client,
      _subjectPackage_SetSubjectClient
    > & { service: _subjectPackage_SetSubjectDefinition };
    SubjectRequest: MessageTypeDefinition;
    SubjectResponse: MessageTypeDefinition;
  };
}

//subject.ts
