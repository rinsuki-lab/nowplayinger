import { IWorld, WorldManager } from "../core/world";
import openUrl from "../../utils/openUrlDialogPromise";
import prompt from "../../utils/promptPromise";

class MastodonWorld implements IWorld {
    static key = "mastodon"

    config: {
        accessToken: string
        screenName: string
        hostName: string
    }
    
    async post(content: string) {
        await fetch("https://"+this.config.hostName+"/api/v1/statuses", {
            method: "POST",
            body: JSON.stringify({
                status: content
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+this.config.accessToken
            }
        })
    }

    static async auth() {
        var world = new MastodonWorld()
        const hostName = await prompt("あなたのMastodonインスタンスホスト名は? (例: mstdn.jp)")
        if (!hostName) return
        const appCreateRes = await fetch("https://"+hostName+"/api/v1/apps", {
            method: "POST",
            body: JSON.stringify({
                client_name: "nowplayinger",
                scopes: "read write",
                redirect_uris: "urn:ietf:wg:oauth:2.0:oob",
                website: "https://github.com/rinsuki/nowplayinger"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(r => r.json())
        const authUrl = `https://${hostName}/oauth/authorize?client_id=${appCreateRes.client_id}&redirect_uri=urn:ietf:wg:oauth:2.0:oob&scope=read+write&response_type=code`
        await openUrl(authUrl)
        const pinCode = await prompt("please input code", "")
        if (pinCode == null) return
        const accessTokenRes = await fetch("https://"+hostName+"/oauth/token", {
            method: "POST",
            body: JSON.stringify({
                grant_type: "authorization_code",
                redirect_uri: "urn:ietf:wg:oauth:2.0:oob",
                client_id: appCreateRes.client_id,
                client_secret: appCreateRes.client_secret,
                code: pinCode
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(r => r.json())
        const userRes = await fetch("https://"+hostName+"/api/v1/accounts/verify_credentials", {
            headers: {"Authorization": "Bearer "+accessTokenRes.access_token}
        }).then(r => r.json())
        if (userRes.username == null) return
        world.config = {
            hostName,
            accessToken: accessTokenRes.access_token,
            screenName: userRes.username
        }
        return world
    }

    getUniqueKey() {
        return "mastodon-"+this.config.screenName+"-"+this.config.hostName
    }

    getDisplayName() {
        return this.config.screenName+"@"+this.config.hostName+" (Mastodon)"
    }
}

WorldManager.addWorld(MastodonWorld)