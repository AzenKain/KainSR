import { ForbiddenException, Injectable } from '@nestjs/common';
import { DataService, VersionConfig } from 'src/data/data.service';
import { starrail } from 'src/proto/starrail';

@Injectable()
export class HttpServerService {
    constructor(
        private dataService: DataService
    ){}
    
    async getDispatchService() {
        const proto: starrail.GlobalDispatchData = new starrail.GlobalDispatchData({
            retcode: 0,
            serverList: [
              {
                name: "KainSR",
                title: "KainSR",
                envType: "2",
                dispatchUrl: "http://127.0.0.1:21000/query_gateway",
              },
            ],
          });
          const buffer = starrail.GlobalDispatchData.encode(proto).finish();
          return Buffer.from(buffer).toString("base64");
    }

    async getGatewayService(versions : string) {
        const dataVersion : VersionConfig = this.dataService.getVersionData()
        if (!dataVersion[versions]) {
            throw new ForbiddenException(
                'This version does not exist',
            );
        }
        const proto : starrail.Gateserver = new starrail.Gateserver({
            retcode : 0,
            ip: "127.0.0.1",
            port: 23301,
            assetBundleUrl: dataVersion[versions].asset_bundle_url,
            exResourceUrl: dataVersion[versions].ex_resource_url,
            luaUrl: dataVersion[versions].lua_url,
            luaVersion: dataVersion[versions].lua_version,
            ifixVersion: "0",
            MCANJEHAEKO: true,
            PGMFEHFKLBG: true,
            NNPPEAAIHAK: true,
            LGPAAPCPBMD: true,
            GNFPFKJHIDJ: true,
            FKFKCDJNHFL: true,
            AOEKIKFKMGA: true,
            useTcp: true,
        });
        const buffer = starrail.Gateserver.encode(proto).finish();
        return Buffer.from(buffer).toString("base64");
        // return this.dataService.decodeMessageToBase64("Gateserver", proto)
    }

    async loginWithAnyService() {
        return {
            "data": {
                "account": {
                    "area_code": "**",
                    "email": "KainSR",
                    "country": "VI",
                    "is_email_verify": "1",
                    "token": "mostsecuretokenever",
                    "uid": "1334"
                },
                "device_grant_required": false,
                "reactivate_required": false,
                "realperson_required": false,
                "safe_mobile_required": false
            },
            "message": "OK",
            "retcode": 0
        }
    }

    async riskyApiCheckService() {
        return {
            "data": {
                "id": "06611ed14c3131a676b19c0d34c0644b",
                "action": "ACTION_NONE",
                "geetest": null
            },
            "message": "OK",
            "retcode": 0
        }
    }
    
    async granterLoginVerificationService() { 
        return {
            "data": {
                "account_type": 1,
                "combo_id": "1337",
                "combo_token": "9065ad8507d5a1991cb6fddacac5999b780bbd92",
                "data": "{\"guest\":false}",
                "heartbeat": false,
                "open_id": "1334"
            },
            "message": "OK",
            "retcode": 0
        }
    }

    async granterApiGetConfigService() {
        return {
            retcode : 0,
            message : "OK",
            data : {
                protocol : true,
                qr_enabled : false,
                log_level : "INFO",
                announce_url : "",
                push_alias_type : 0,
                disable_ysdk_guard : true,
                enable_announce_pic_popup : false,
                app_name : "崩 ??RPG",
                qr_enabled_apps : {
                    bbs : false,
                    cloud : false,
                },
                qr_app_icons : {
                    app : "",
                    bbs : "",
                    cloud : "",
                },
                qr_cloud_display_name : "",
                enable_user_center : true,
                functional_switch_configs : {},
            },
        }
    }

    async shieldApiLoadConfigService() {
        return {
            retcode : 0,
            message : "OK",
            data : {
                id : 24,
                game_key : "hkrpg_global",
                client : "PC",
                identity : "I_IDENTITY",
                guest : false,
                ignore_versions : "",
                scene : "S_NORMAL",
                name : "崩 ??RPG",
                disable_regist : false,
                enable_email_captcha : false,
                thirdparty : { "fb", "tw", "gl", "ap" },
                disable_mmt : false,
                server_guest : false,
                thirdparty_ignore : {},
                enable_ps_bind_account : false,
                thirdparty_login_configs : {
                    tw : {
                        token_type : "TK_GAME_TOKEN",
                        game_token_expires_in : 2592000,
                    },
                    ap : {
                        token_type : "TK_GAME_TOKEN",
                        game_token_expires_in : 604800,
                    },
                    fb : {
                        token_type : "TK_GAME_TOKEN",
                        game_token_expires_in : 2592000,
                    },
                    gl : {
                        token_type : "TK_GAME_TOKEN",
                        game_token_expires_in : 604800,
                    },
                },
                initialize_firebase : false,
                bbs_auth_login : false,
                bbs_auth_login_ignore : {},
                fetch_instance_id : false,
                enable_flash_login : false,
            },
        }
    }
    
    async shieldApiVerifyService() {
        return {
            "data": {
                "account_type": 1,
                "combo_id": "1337",
                "combo_token": "9065ad8507d5a1991cb6fddacac5999b780bbd92",
                "data": "{\"guest\":false}",
                "heartbeat": false,
                "open_id": "1334"
            },
            "message": "OK",
            "retcode": 0
        }
    }

}
