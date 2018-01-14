import Music from "../../music";

export interface IMusicPlayer {
    config: {[key: string]: any}
    getNowplaying: () => Promise<Music | null>
    getDisplayName: () => string
}

interface IMusicPlayerStatic {
    new (): IMusicPlayer
    key: string
}

export class MusicPlayerManager {
    static musicplayers: {[key: string]: IMusicPlayerStatic} = {}
    static addPlayer(player: IMusicPlayerStatic) {
        if (MusicPlayerManager.musicplayers[player.key]) {
            throw "already added this MusicPlayer"
        }
        MusicPlayerManager.musicplayers[player.key] = player
    }
}
