import { CoachAction } from "../proto/protos/CoachAction";
import { PlayerParam } from "../proto/protos/PlayerParam";
import { PlayerType } from "../proto/protos/PlayerType";
import { ServerParam } from "../proto/protos/ServerParam";
import { WorldModel } from "../proto/protos/WorldModel";

export class SampleCoachAgent {
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

    getActions(wm: WorldModel): CoachAction[] {
        // if (this.first_substitution
        //     && Object.keys(this.playerType).length === this.playerParam?.playerTypes
        //     && wm.cycle === 0){
        //     console.log("Substitution");
        //     let actions: CoachAction[] = [];
        //     for (let i = 0; i < 11; i++){
        //         actions.push({
        //             changePlayerTypes: {
        //                 uniformNumber: i + 1,
        //                 type: i
        //             }
        //         });
        //     }
        //     this.first_substitution = false;
        //     console.log("Substitution Done");
        //     return actions;
        // }
        // else {
        //     return [];
        // }
        return [
            {
                doHeliosSubstitute: {}
            }
        ]
    }
}