import { IWorld, WorldManager } from "../core/world";

class TwitterWorld implements IWorld {

    // 下の二行は馬鹿にしか見えない
    static obakaKey = "51HCnsA0XqvtzfKMXaQafMZMv"
    static obakaSecret = "WIjMfPf4Izo3jcC64V2UgT9eczDF5SkwU3XonZhDuP0mlP8B3C"
    // 上の二行は馬鹿にしか見えない

    static key = "twitter"
    config: {
        accessToken: string
        accessTokenSecret: string
        screenName: string
    }
    async post(content: string) {
        console.log("WIP: なんかする")
    }

    getUniqueKey() {
        return "twitter_"+this.config.screenName
    }

    getDisplayName() {
        return this.config.screenName+"@twitter.com"
    }
}

WorldManager.addWorld(TwitterWorld)