import { Server, ServerCredentials, credentials, loadPackageDefinition } from '@grpc/grpc-js';
import { ProtoGrpcType } from '../proto/service';
import { loadSync } from '@grpc/proto-loader';
import { GRpcService } from './grpc-service';

const PROTO_FILE = __dirname + '/../proto/service.proto';

const packageDefinition = loadSync(PROTO_FILE);
const grpc = (loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType;

var server = new Server();
var service = new GRpcService();
server.addService(grpc.protos.Game.service, {
  GetActions: (call: any, callback: any) => {
    service.getActions(call, callback);
  },
  SendInitMessage: (call: any, callback: any) => {
    service.sendInitMessage(call, callback);
  },
  SendServerParam: (call: any, callback: any) => {
    service.sendServerParam(call, callback);
  },
  SendPlayerParam: (call: any, callback: any) => {
    service.sendPlayerParam(call, callback);
  },
  SendPlayerType: (call: any, callback: any) => {
    service.sendPlayerType(call, callback);
  }
});
server.bindAsync('localhost:50051', ServerCredentials.createInsecure(), () => {
  console.log('Server is up');
  server.start();
});