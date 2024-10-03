import { GameModeType } from "../proto/protos/GameModeType";
import { PlayerAction } from "../proto/protos/PlayerAction";
import { HeliosOffensivePlanner } from "../proto/protos/HeliosOffensivePlanner";
import { RpcActionState } from "../proto/protos/RpcActionState";
import { PlayerParam } from "../proto/protos/PlayerParam";
import { PlayerType } from "../proto/protos/PlayerType";
import { ServerParam } from "../proto/protos/ServerParam";
import { WorldModel } from "../proto/protos/WorldModel";
import { BestPlannerActionRequest } from "../proto/protos/BestPlannerActionRequest";
import { State } from "../proto/protos/State";
import {RegisterResponse} from "../proto/protos/RegisterResponse";
import { register } from "ts-node";
import { BestPlannerActionResponse } from "../proto/protos/BestPlannerActionResponse";
export class SamplePlayerAgent{
    serverParam: ServerParam | null;
    playerParam: PlayerParam | null;
    playerType: { [key: number]: PlayerType };

    constructor(){
        this.serverParam = null;
        this.playerParam = null;
        this.playerType = {};
    }

    setServerParam(serverParam: ServerParam){
        // console.log('setServerParam');
        this.serverParam = serverParam;
    }
    setPlayerParam(playerParam: PlayerParam){
        // console.log('setPlayerParam');
        this.playerParam = playerParam;
    }
    setPlayerType(playerType: PlayerType){
        if (playerType.id == undefined) {
            return
        }
        this.playerType[playerType.id] = playerType;
    }

    getActions(wm: WorldModel): PlayerAction[] {
        let actions: PlayerAction[] = [];
        if (wm.gameModeType === GameModeType.PlayOn){
            if (wm.self?.isGoalie)
            {
                actions.push({
                    heliosGoalie: {}
                });
            }
            else if (wm.self?.isKickable){
                actions.push({
                    heliosOffensivePlanner: {
                        cross: true,
                        directPass: true,
                        leadPass: true,
                        throughPass: true,
                        shortDribble: true,
                        longDribble: true,
                        simplePass: true,
                        simpleDribble: true,
                        simpleShoot: true,
                        serverSideDecision: true
                    }
                });
                actions.push({heliosShoot : {}});
            }
            else {
                actions.push({
                    heliosBasicMove: {}
                });
            }
        }
        else if (wm.isPenaltyKickMode){
            actions.push({
                heliosPenalty: {}
            });
        }
        else{
            actions.push(
                {
                    heliosSetPlay: {}
                }
            );
        }
        return actions;
    }
    getBestPlannerAction(request : BestPlannerActionRequest): BestPlannerActionResponse {
        const pairs = request.pairs || {};
        const cycle = request.state?.worldModel?.cycle;
        const uniformNumber = request.registerResponse?.uniformNumber;
    
        console.log(`GetBestPlannerAction cycle: ${cycle} pairs: ${pairs ? Object.keys(pairs).length : 0} unum: ${uniformNumber}`);
    
        const pairsList = Object.entries(pairs);
        
        pairsList.sort((a, b) => Number(a[0]) - Number(b[0]));
    
        let bestAction = pairsList.reduce<{ key: number; actionState: RpcActionState; evaluation: number } | null>((best, [key, actionState]) => {
            const evaluation = actionState.action?.parentIndex !== -1 ? -1000 : (actionState.predictState?.ballPosition?.x ?? -1000);

            if (!best || Number(evaluation) > best.evaluation) {
                return { key: Number(key), actionState, evaluation: evaluation as number };
            }
            return best;
        }, null);
    
        if (bestAction) {
            const { actionState } = bestAction || {};
            console.log(`Best action: ${bestAction.key} ${actionState.action?.description} to ${actionState.action?.targetUnum} in (${actionState.action?.targetPoint?.x})}, ${actionState.action?.targetPoint?.y}) e: ${bestAction.evaluation}`);
        }
    
        console.log(`Best action index: ${bestAction ? bestAction.key : 0}`);
        const bestPlannerActionResponse: BestPlannerActionResponse = {
            index: bestAction ? bestAction.key : 0
    };
        return bestPlannerActionResponse;
    }
    
    
    
}