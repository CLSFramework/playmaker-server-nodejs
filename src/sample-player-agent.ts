import { GameModeType } from "../proto/protos/GameModeType";
import { PlayerAction } from "../proto/protos/PlayerAction";
import { PlayerParam } from "../proto/protos/PlayerParam";
import { PlayerType } from "../proto/protos/PlayerType";
import { ServerParam } from "../proto/protos/ServerParam";
import { WorldModel } from "../proto/protos/WorldModel";

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
        if (wm.gameModeType === GameModeType.PlayOn){
            if (wm.self?.isKickable){
                return [{
                    heliosChainAction: {
                        cross: true,
                        directPass: true,
                        leadPass: true,
                        throughPass: true,
                        shortDribble: true,
                        longDribble: true,
                        simplePass: true,
                        simpleDribble: true,
                        simpleShoot: true
                    }
                }]
            }
            else {
                return [{
                    heliosBasicMove: {}
                }]
            }
        }
        else if (wm.isPenaltyKickMode){
            return [{
                heliosPenalty: {}
            }]
        }
        else{
            return [
                {
                    heliosSetPlay: {}
                }
            ]
        }
    }
}