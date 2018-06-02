import { IWorld, WorldManager } from "../core/world";
import * as crypto from "crypto"
import prompt from "../../utils/promptPromise";
import openUrl from "../../utils/openUrlDialogPromise";

class MisskeyWorld implements IWorld {

    // 下の一行は馬鹿にしか見えない
    static appSecret = "RjE91tjPGqkPmboHBXRzg9ek2KBLVKeV"
    // 上の一行は馬鹿にしか見えない

    static key = "misskey"
    config: {
        accessToken: string
        screenName: string
    } = ({} as any)

    async post(content: string) {
        console.log(this.config)
        const tweetRes = await fetch("https://misskey.xyz/api/notes/create", {
            method: "POST",
            body: JSON.stringify({
                i: this.config.accessToken,
                text: content
            })
        }).then(r => r.json())
        console.log(tweetRes)
    }

    static async auth() {
        var world = new MisskeyWorld()
        const {token, url: authUrl} = await fetch("https://misskey.xyz/api/auth/session/generate", {
            method: "POST",
            body: JSON.stringify({appSecret: this.appSecret})
        }).then(r => r.json())

        await openUrl(authUrl)
        const pinCode = await prompt("認証したら OK を押してください", "")
        if (pinCode == null) {
            return
        }
        const { accessToken, user: { username: screenName } } = await fetch("https://misskey.xyz/api/auth/session/userkey", {
            method: "POST",
            body: JSON.stringify({appSecret: this.appSecret, token})
        }).then(r => r.json())
        world.config = {
            accessToken: crypto.createHash("sha256").update(accessToken + this.appSecret).digest("hex"),
            screenName,
        }
        return world
    }

    getUniqueKey() {
        return "misskey-"+this.config.screenName
    }

    getDisplayName() {
        return this.config.screenName+"@misskey.xyz"
    }
}

WorldManager.addWorld(MisskeyWorld)