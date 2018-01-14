import { IMusicPlayer, MusicPlayerManager } from "../core/musicplayer";
import Music from "../../music";

class FakePlayer implements IMusicPlayer {
    static key = "fake"
    config = {}
    async getNowplaying() {
        const music = new Music()
        music.title = "fake music"
        music.album = "fake album"
        music.artist = "fake artist"
        return music
    }

    getDisplayName() {
        return "fake player"
    }
    
    getUniqueKey() {
        return "fake"
    }
}

MusicPlayerManager.addPlayer(FakePlayer)