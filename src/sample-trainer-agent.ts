import { PlayerParam } from "../proto/protos/PlayerParam";
import { PlayerType } from "../proto/protos/PlayerType";
import { ServerParam } from "../proto/protos/ServerParam";
import { TrainerAction } from "../proto/protos/TrainerAction";
import { WorldModel, WorldModel__Output } from "../proto/protos/WorldModel";

export class SampleTrainerAgent {
    serverParam: ServerParam | null;
    playerParam: PlayerParam | null;
    playerType: { [key: number]: PlayerType };

    first_substitution: boolean = true;

    constructor(){
        this.serverParam = null;
        this.playerParam = null;
        this.playerType = {};
    }

    setServerParam(serverParam: ServerParam){
        this.serverParam = serverParam;
    }

    setPlayerParam(playerParam: PlayerParam){
        this.playerParam = playerParam;
    }

    setPlayerType(playerType: PlayerType){
        if (playerType.id == undefined) {
            return
        }
        this.playerType[playerType.id] = playerType;
    }

    getActions(wm: WorldModel__Output): TrainerAction[] {
        if (wm.cycle % 100 === 0){
            return [
                {
                    doMoveBall:{
                        position: {
                            x: 20,
                            y: 0
                        },
                        velocity: {
                            x: 0,
                            y: 0
                        }
                    }
                }
            ]
        }
        return [];
    }
}