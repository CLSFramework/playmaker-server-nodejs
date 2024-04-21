import { AgentType } from "../proto/protos/AgentType";
import { WorldModel__Output } from "../proto/protos/WorldModel";
import { SampleCoachAgent } from "./sample-coach-agent";
import { SamplePlayerAgent } from "./sample-player-agent";
import { SampleTrainerAgent } from "./sample-trainer-agent";

export class GRpcService{
    playerAgent: SamplePlayerAgent;
    coachAgent: SampleCoachAgent;
    trainerAgent: SampleTrainerAgent;

    constructor(){
        console.log('GRpcService Init')
        this.playerAgent = new SamplePlayerAgent();
        this.coachAgent = new SampleCoachAgent();
        this.trainerAgent = new SampleTrainerAgent();
    }

    sendInitMessage(call: any, callback: any) {
        console.log('sendInitMessage');
        callback(null,  {Empty: {}});
    }

    sendServerParam(call: any, callback: any) {
        // console.log('sendServerParam');
        this.playerAgent.setServerParam(call.request);
        this.coachAgent.setServerParam(call.request);
        this.trainerAgent.setServerParam(call.request);
        callback(null,  {Empty: {}});
    }

    sendPlayerParam(call: any, callback: any) {
        // console.log('sendPlayerParam');
        this.playerAgent.setPlayerParam(call.request);
        this.coachAgent.setPlayerParam(call.request);
        this.trainerAgent.setPlayerParam(call.request);
        callback(null,  {Empty: {}});
    }

    sendPlayerType(call: any, callback: any) {
        this.playerAgent.setPlayerType(call.request);
        this.coachAgent.setPlayerType(call.request);
        this.trainerAgent.setPlayerType(call.request);
        callback(null,  {Empty: {}});
    }

    getPlayerActions(call: any, callback: any) {
        let actions = this.playerAgent.getActions(call.request.worldModel);
        callback(null,  {actions: actions});
    }

    getCoachActions(call: any, callback: any) {
        let actions = this.coachAgent.getActions(call.request.worldModel);
        callback(null,  {actions: actions});
    }

    getTrainerActions(call: any, callback: any) {
        let actions = this.trainerAgent.getActions(call.request.worldModel);
        callback(null,  {actions: actions});
    }

    getInitMessage(call: any, callback: any) {
        console.log('getInitMessage');
        callback(null,  {Empty: {}});
    }
}