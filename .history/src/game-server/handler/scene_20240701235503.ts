import { starrail } from "src/proto/starrail";
import { NetSession } from "../NetSession";
import { CmdID } from "src/proto/cmdId";



export async function onGetCurSceneInfoCsReq(
    body: starrail.SceneInfo,
    player: NetSession,
    dataModule: any | null = null
) {
    body.gameModeType = 1;
    body.planeId = 20101;
    body.floorId = 20101001;
    body.entryId = 2010101;

    { // Character
        const scene_group: starrail.SceneGroupInfo = new starrail.SceneGroupInfo()
        scene_group.state = 1;
        scene_group.entityList.push(new starrail.SceneEntityInfo({
            Actor: {
                baseAvatarId: 1221,
                avatarType: starrail.AvatarType.AVATAR_FORMAL_TYPE,
                uid: 1334,
                mapLayer: 2
            },
            Motion: {
                pos: {
                    x: -2300,
                    y: 19365,
                    z: 3150
                },
                rot: {}
            }
        }))
        body.sceneGroupList.push(scene_group)
    }

    {
        const scene_group: starrail.SceneGroupInfo = new starrail.SceneGroupInfo()
        scene_group.state = 1;
        scene_group.groupId = 19;

        const prop: starrail.ScenePropInfo = new starrail.ScenePropInfo();
        prop.propId = 808;
        prop.propState = 1;

        scene_group.entityList.push(new starrail.SceneEntityInfo({
            GroupId: 19,
            InstId: 300001,
            EntityId: 1334,
            Prop: prop,
            Motion: {
                pos: {
                    x: -570,
                    y: 19364,
                    z: 4480
                },
                rot: {}
            }
        }))

        body.sceneGroupList.push(scene_group)
    }
    const proto: starrail.GetCurSceneInfoScRsp = new starrail.GetCurSceneInfoScRsp({
        retcode: 0,
        scene: body
    })
    const bufferData = starrail.GetCurSceneInfoScRsp.encode(proto).finish()
    await player.send(CmdID.CmdGetCurSceneInfoScRsp, bufferData);
}

export async function onSceneEntityMoveCsReq(
    body: starrail.SceneE,
    player: NetSession,
    dataModule: any | null = null
) {

}