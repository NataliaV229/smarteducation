// Original file: proto/connection.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ConnectRequest as _connectionPackage_ConnectRequest, ConnectRequest__Output as _connectionPackage_ConnectRequest__Output } from '../connectionPackage/ConnectRequest';
import type { ConnectResponse as _connectionPackage_ConnectResponse, ConnectResponse__Output as _connectionPackage_ConnectResponse__Output } from '../connectionPackage/ConnectResponse';

export interface ConnectionClient extends grpc.Client {
  GetConnected(argument: _connectionPackage_ConnectRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_connectionPackage_ConnectResponse__Output>): grpc.ClientUnaryCall;
  GetConnected(argument: _connectionPackage_ConnectRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_connectionPackage_ConnectResponse__Output>): grpc.ClientUnaryCall;
  GetConnected(argument: _connectionPackage_ConnectRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_connectionPackage_ConnectResponse__Output>): grpc.ClientUnaryCall;
  GetConnected(argument: _connectionPackage_ConnectRequest, callback: grpc.requestCallback<_connectionPackage_ConnectResponse__Output>): grpc.ClientUnaryCall;
  getConnected(argument: _connectionPackage_ConnectRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_connectionPackage_ConnectResponse__Output>): grpc.ClientUnaryCall;
  getConnected(argument: _connectionPackage_ConnectRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_connectionPackage_ConnectResponse__Output>): grpc.ClientUnaryCall;
  getConnected(argument: _connectionPackage_ConnectRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_connectionPackage_ConnectResponse__Output>): grpc.ClientUnaryCall;
  getConnected(argument: _connectionPackage_ConnectRequest, callback: grpc.requestCallback<_connectionPackage_ConnectResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface ConnectionHandlers extends grpc.UntypedServiceImplementation {
  GetConnected: grpc.handleUnaryCall<_connectionPackage_ConnectRequest__Output, _connectionPackage_ConnectResponse>;
  
}

export interface ConnectionDefinition extends grpc.ServiceDefinition {
  GetConnected: MethodDefinition<_connectionPackage_ConnectRequest, _connectionPackage_ConnectResponse, _connectionPackage_ConnectRequest__Output, _connectionPackage_ConnectResponse__Output>
}
