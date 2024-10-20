import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as dgram from 'dgram';
import Handshake, { HandshakeType } from './handshacke';
import { KCP } from "node-kcp-token";
import { NetSession } from './NetSession';
import { DataService } from '@/data/data.service';


@Injectable()
export class GameServerKcpService implements OnModuleInit {
    private server: dgram.Socket;
    private sessions : {[key:string] : NetSession} = {};
    private readonly logger = new Logger(GameServerKcpService.name);

    constructor(
        private dataService : DataService
    ) {}

    onModuleInit() {
        this.server = dgram.createSocket('udp4');

        this.server.on('message', (msg, rinfo) => {
            this.handleMessage(msg, rinfo);
        });

        this.server.on('error', (err) => {
            this.logger.error(`Server error: ${err.message}`);
            this.server.close();
        });

        this.server.on('listening', () => {
            const address = this.server.address();
            this.logger.log(`Server KCP listening on ${address.address}:${address.port}`);
        });

        this.server.bind(23301);
    }
    private output(buf: Buffer, size: number, ctx: { address: string, port: number, family: string }) {
        if (!buf) return;
        this.logger.log(new Uint8Array(buf))
        this.server.send(buf, 0, size, ctx.port, ctx.address);
    }

    private handleMessage(data: Buffer, rinfo: dgram.RemoteInfo) {
        const client = `${rinfo.address}:${rinfo.port}`;
        if (data.byteLength == 20) {
            // Hamdshanke
            const handshake = new Handshake(data);

            switch (handshake.handshakeType) {
                case HandshakeType.CONNECT:
                    console.log(`${client} connected`);
                    const rsp = new Handshake(HandshakeType.SEND_BACK_CONV, 0x69, 0x96).encode();
                    this.server.send(rsp, 0, rsp.byteLength, rinfo.port, rinfo.address);
                    const kcpobj = new KCP(0x69, 0x96, {
                        address: rinfo.address,
                        port: rinfo.port,
                        family: rinfo.family
                    });
                    kcpobj.nodelay(1, 10, 2, 0);
                    kcpobj.output((d, s, u) => this.output(d, s, u));
                    kcpobj.wndsize(256, 256);
                    this.sessions[client] = new NetSession(kcpobj, this.dataService, this.logger);
                    break;
                case HandshakeType.DISCONNECT:
                    console.log(`${rinfo.address} disconnected`);
                    delete this.sessions[client];
                    break;
                default:
                    console.error(`${client} send unknown Handshake: ${data.readUint32BE(0)}`);
            }
            return;
        }


        if (!this.sessions[client]) return;
        this.sessions[client].handlerInput(data);
    }
}
