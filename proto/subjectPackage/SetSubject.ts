// Original file: proto/subject.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { SubjectRequest as _subjectPackage_SubjectRequest, SubjectRequest__Output as _subjectPackage_SubjectRequest__Output } from '../subjectPackage/SubjectRequest';
import type { SubjectResponse as _subjectPackage_SubjectResponse, SubjectResponse__Output as _subjectPackage_SubjectResponse__Output } from '../subjectPackage/SubjectResponse';

export interface SetSubjectClient extends grpc.Client {
  Subjects(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_subjectPackage_SubjectResponse__Output>): grpc.ClientWritableStream<_subjectPackage_SubjectRequest>;
  Subjects(metadata: grpc.Metadata, callback: grpc.requestCallback<_subjectPackage_SubjectResponse__Output>): grpc.ClientWritableStream<_subjectPackage_SubjectRequest>;
  Subjects(options: grpc.CallOptions, callback: grpc.requestCallback<_subjectPackage_SubjectResponse__Output>): grpc.ClientWritableStream<_subjectPackage_SubjectRequest>;
  Subjects(callback: grpc.requestCallback<_subjectPackage_SubjectResponse__Output>): grpc.ClientWritableStream<_subjectPackage_SubjectRequest>;
  subjects(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_subjectPackage_SubjectResponse__Output>): grpc.ClientWritableStream<_subjectPackage_SubjectRequest>;
  subjects(metadata: grpc.Metadata, callback: grpc.requestCallback<_subjectPackage_SubjectResponse__Output>): grpc.ClientWritableStream<_subjectPackage_SubjectRequest>;
  subjects(options: grpc.CallOptions, callback: grpc.requestCallback<_subjectPackage_SubjectResponse__Output>): grpc.ClientWritableStream<_subjectPackage_SubjectRequest>;
  subjects(callback: grpc.requestCallback<_subjectPackage_SubjectResponse__Output>): grpc.ClientWritableStream<_subjectPackage_SubjectRequest>;
  
}

export interface SetSubjectHandlers extends grpc.UntypedServiceImplementation {
  Subjects: grpc.handleClientStreamingCall<_subjectPackage_SubjectRequest__Output, _subjectPackage_SubjectResponse>;
  
}

export interface SetSubjectDefinition extends grpc.ServiceDefinition {
  Subjects: MethodDefinition<_subjectPackage_SubjectRequest, _subjectPackage_SubjectResponse, _subjectPackage_SubjectRequest__Output, _subjectPackage_SubjectResponse__Output>
}
