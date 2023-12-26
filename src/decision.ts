import { Action } from "../proto/protos/Action";
import { WorldModel } from "../proto/protos/WorldModel";

function getActions(wm: WorldModel): Action[] {
    let actions: Action[] = [
        {
            action: "bodyGoToPoint",
            bodyGoToPoint: {
                targetPoint: {
                    x: wm.ball?.position?.x,
                    y: wm.ball?.position?.y,
                },
                maxDashPower: 100,
                distanceThreshold: 0.5,
            }
        }
    ]
    return actions;
}

export function decision(call: any, callback: any) {
    console.log('Decision');
    const wm: WorldModel = call.request.worldModel;
    callback(null, { actions: getActions(wm) });
}