import {IMusicPlayer, MusicPlayerManager} from "../core/musicplayer"
import nowplaying from "itunes-nowplaying-mac"
import Music from "../../music";

class ITunesMacPlayer implements IMusicPlayer {
    static key = "itunes_mac"
    config = {}
    async getNowplaying() {
        const res = await nowplaying()
        if (!res) return null
        const music = new Music()
        music.title = res.name
        music.album = res.album.name
        music.artist = res.artist
        return music
    }

    getDisplayName() {
        return "iTunes (Mac)"
    }
    
    getUniqueKey() {
        return "itunes_mac"
    }
}

MusicPlayerManager.addPlayer(ITunesMacPlayer)