import { Server, ServerCredentials, credentials, loadPackageDefinition } from '@grpc/grpc-js';
import { ProtoGrpcType } from '../proto/service';
import { loadSync } from '@grpc/proto-loader';
import { decision } from './decision';

const PROTO_FILE = __dirname + '/../proto/service.proto';

const packageDefinition = loadSync(PROTO_FILE);
const grpc = (loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType;

var server = new Server();
server.addService(grpc.protos.Game.service, {
  GetActions: decision
});
server.bindAsync('localhost:50051', ServerCredentials.createInsecure(), () => {
  console.log('Server is up');
  server.start();
});