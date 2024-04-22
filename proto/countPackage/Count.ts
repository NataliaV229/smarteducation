// Original file: proto/count.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CountRequest as _countPackage_CountRequest, CountRequest__Output as _countPackage_CountRequest__Output } from '../countPackage/CountRequest';
import type { CountResponse as _countPackage_CountResponse, CountResponse__Output as _countPackage_CountResponse__Output } from '../countPackage/CountResponse';

export interface CountClient extends grpc.Client {
  CountFunction(argument: _countPackage_CountRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_countPackage_CountResponse__Output>;
  CountFunction(argument: _countPackage_CountRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_countPackage_CountResponse__Output>;
  countFunction(argument: _countPackage_CountRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_countPackage_CountResponse__Output>;
  countFunction(argument: _countPackage_CountRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_countPackage_CountResponse__Output>;
  
}

export interface CountHandlers extends grpc.UntypedServiceImplementation {
  CountFunction: grpc.handleServerStreamingCall<_countPackage_CountRequest__Output, _countPackage_CountResponse>;
  
}

export interface CountDefinition extends grpc.ServiceDefinition {
  CountFunction: MethodDefinition<_countPackage_CountRequest, _countPackage_CountResponse, _countPackage_CountRequest__Output, _countPackage_CountResponse__Output>
}
