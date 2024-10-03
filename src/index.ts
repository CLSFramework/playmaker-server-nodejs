import { Server, ServerCredentials, credentials, loadPackageDefinition } from '@grpc/grpc-js';
import { ProtoGrpcType } from '../proto/service';
import { loadSync } from '@grpc/proto-loader';
import { GRpcService } from './grpc-service';

const PROTO_FILE = __dirname + '/../proto/service.proto';

const packageDefinition = loadSync(PROTO_FILE,{
  defaults: true,
});
const grpc = (loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType;

var connection_number = 0;

var server = new Server();
var service = new GRpcService();
server.addService(grpc.protos.Game.service, {
  GetPlayerActions: (call: any, callback: any) => {
    service.getPlayerActions(call, callback);
  },
  GetCoachActions: (call: any, callback: any) => {
    service.getCoachActions(call, callback);
  },
  GetTrainerActions: (call: any, callback: any) => {
    service.getTrainerActions(call, callback);
  },
  SendInitMessage: (call: any, callback: any) => {
    console.log("SendInitMessage")
    service.sendInitMessage(call, callback);
  },
  SendServerParams: (call: any, callback: any) => {
    service.sendServerParam(call, callback);
  },
  SendPlayerParams: (call: any, callback: any) => {
    service.sendPlayerParam(call, callback);
  },
  SendPlayerType: (call: any, callback: any) => {
    service.sendPlayerType(call, callback);
  },
  Register: (call: any, callback: any) => {
    connection_number++;
    console.log("Connection number: " + connection_number);
    service.register(call, callback,connection_number);
  },
  SendByeCommand: (call: any, callback: any) => {
    connection_number--;
    console.log("Connection number: " + connection_number);
    callback(null,  {Empty: {}});
    if(connection_number == 0){
      console.log("All connections closed");
      server.tryShutdown(() => {
        console.log("Server shutdown");
      });
    }
  },
  GetBestPlannerAction: (call: any, callback: any) => {
    service.getBestPlannerAction(call, callback);
  }
});
server.bindAsync('localhost:50051', ServerCredentials.createInsecure(), () => {
  console.log('Server is up');
  server.start();
});