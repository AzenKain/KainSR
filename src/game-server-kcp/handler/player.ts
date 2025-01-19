
import { starrail } from 'src/proto/starrail';
import { NetSession } from "../NetSession"
import { CmdID } from 'src/proto/cmdId';
import Long from "long";

export async function onPlayerHeartBeatCsReq(
    body: starrail.PlayerHeartBeatCsReq,
    player: NetSession,
    dataModule: any | null = null
): Promise<void> {

    const base64_string = `bG9jYWwgZnVuY3Rpb24gYmV0YV90ZXh0KG9iaikKICAgIGxvY2FsIGdhbWVPYmplY3QgPSBDUy5Vbml0eUVuZ2luZS5HYW1lT2JqZWN0LkZpbmQoIlVJUm9vdC9BYm92ZURpYWxvZy9CZXRhSGludERpYWxvZyhDbG9uZSkiKQoKICAgIGlmIGdhbWVPYmplY3QgdGhlbgogICAgICAgIGxvY2FsIHRleHRDb21wb25lbnQgPSBnYW1lT2JqZWN0OkdldENvbXBvbmVudEluQ2hpbGRyZW4odHlwZW9mKENTLlJQRy5DbGllbnQuTG9jYWxpemVkVGV4dCkpCgogICAgICAgIGlmIHRleHRDb21wb25lbnQgdGhlbgogICAgICAgICAgICB0ZXh0Q29tcG9uZW50LnRleHQgPSAiPGNvbG9yPSM0N0ZGOTg+RmlyZUZseTwvY29sb3I+PGNvbG9yPSNERjY5MTU+UFM8L2NvbG9yPiA8Y29sb3I9I0ZGRkZGRj5ieTwvY29sb3I+IDxjb2xvcj0jQUZEQkY1PkthaW48L2NvbG9yPiIKICAgICAgICAgICAgLS0gdGV4dENvbXBvbmVudC50ZXh0ID0gIlRoaXMgaXMgYSBiZXRhIHZlcnNpb24gc28gdGhlcmUgYXJlIG1hbnkgZXJyb3JzLiBQbGVhc2UgdHJ5IHRoZSBvZmZpY2lhbCB2ZXJzaW9uIgogICAgICAgIGVsc2UKICAgICAgICAgICAgLS0gbG9nOndyaXRlKCJObyBUZXh0IGNvbXBvbmVudCBmb3VuZCBvbiB0aGUgZ2FtZSBvYmplY3QiKQogICAgICAgIGVuZAogICAgZWxzZQogICAgICAgIC0tIGxvZzp3cml0ZSgiR2FtZSBvYmplY3Qgbm90IGZvdW5kIikKICAgIGVuZAplbmQKCmxvY2FsIGZ1bmN0aW9uIHZlcnNpb25fdGV4dChvYmopCiAgICBsb2NhbCBnYW1lT2JqZWN0ID0gQ1MuVW5pdHlFbmdpbmUuR2FtZU9iamVjdC5GaW5kKCJWZXJzaW9uVGV4dCIpCiAgICBsb2NhbCB1aWQgPSBnYW1lT2JqZWN0OkdldENvbXBvbmVudCgiVGV4dCIpCiAgICB1aWQudGV4dCA9ICI8Y29sb3I9I0ZGNTVFNz5CZXRhIDIuNi5YIHwgV2FpZnUgTG92ZXI8L2NvbG9yPiIKZW5kCgp2ZXJzaW9uX3RleHQoKQpiZXRhX3RleHQoKQ==`;
    const bytesDecode = new Uint8Array(Buffer.from(base64_string, 'base64'));
    const proto: starrail.PlayerHeartBeatScRsp = new starrail.PlayerHeartBeatScRsp({
        downloadData:{
            version: 51,
            time: new Long(new Date().getTime()),
            data: bytesDecode,
        },
        serverTimeMs: new Long(new Date().getTime()),
        retcode: 0,
        clientTimeMs: body.clientTimeMs,
    });
    
    const bufferData = starrail.PlayerHeartBeatScRsp.encode(proto).finish()

    await player.send(
        CmdID.CmdPlayerHeartBeatScRsp,
        bufferData
    );
}
export async function onGetBasicInfoCsReq(
    body: any,
    player: NetSession,
    dataModule: any | null = null
): Promise<void> {
    const proto: starrail.GetBasicInfoScRsp = new starrail.GetBasicInfoScRsp({
        curDay : 1,
        exchangeTimes : 0,
        retcode : 0,
        nextRecoverTime : 2281337,
        weekCocoonFinishedCount : 0
    });

    const bufferData = starrail.GetBasicInfoScRsp.encode(proto).finish()

    await player.send(CmdID.CmdGetBasicInfoScRsp, bufferData);
}