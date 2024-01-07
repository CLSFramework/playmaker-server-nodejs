import { SamplePlayerAgent } from "./sample-player-agent";

export class GRpcService{
    agent: SamplePlayerAgent;

    constructor(){
        console.log('GRpcService Init')
        this.agent = new SamplePlayerAgent();
    }

    sendInitMessage(call: any, callback: any) {
        console.log('sendInitMessage');
        callback(null,  {Empty: {}});
    }

    sendServerParam(call: any, callback: any) {
        console.log('sendServerParam');
        this.agent.setServerParam(call.request.serverParam);
        callback(null,  {Empty: {}});
    }

    sendPlayerParam(call: any, callback: any) {
        console.log('sendPlayerParam');
        this.agent.setPlayerParam(call.request.playerParam);
        callback(null,  {Empty: {}});
    }

    sendPlayerType(call: any, callback: any) {
        console.log('sendPlayerType');
        this.agent.setPlayerType(call.request.playerType);
        callback(null,  {Empty: {}});
    }

    getActions(call: any, callback: any) {
        let actions = this.agent.getActions(call.request.worldModel);
        callback(null,  {actions: actions});
    }

}