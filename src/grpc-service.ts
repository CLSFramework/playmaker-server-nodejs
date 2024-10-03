import { AgentType } from "../proto/protos/AgentType";
import { WorldModel__Output } from "../proto/protos/WorldModel";
import { SampleCoachAgent } from "./sample-coach-agent";
import { SamplePlayerAgent } from "./sample-player-agent";
import { SampleTrainerAgent } from "./sample-trainer-agent";
import type { RegisterResponse } from "../proto/protos/RegisterResponse";
import { isCallOrNewExpression } from "typescript";
import { BestPlannerActionRequest } from "../proto/protos/BestPlannerActionRequest";

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

    register(call: any, callback: any , connection_number: number) {
        console.log('Register');
        let response: RegisterResponse = {};
        response.uniformNumber = call.request.uniformNumber;
        response.agentType = call.request.agentType;
        response.teamName = call.request.teamName;
        response.clientId = connection_number;
        callback(null,  response);
    }

    getBestPlannerAction(call: any, callback: any) {
        let action_number = this.playerAgent.getBestPlannerAction(call.request);
        callback(null,  action_number);
    }
}