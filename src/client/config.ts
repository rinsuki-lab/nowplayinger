import { IMusicPlayer, MusicPlayerManager } from "./plugins/core/musicplayer";
import { IWorld, WorldManager } from "./plugins/core/world";
import "./plugins"

class Config {
    players: IMusicPlayer[]
    worlds: IWorld[]
    constructor() {
        const config: any = JSON.parse(localStorage.getItem("nowplayinger.config") || "{}")
        const players = ((config.players || []) as {key: string, config: {[key: string]: any}}[])
        this.players = players.map(player_config => {
            const player_class = MusicPlayerManager.musicplayers[player_config.key]
            const player = new player_class()
            player.config = player_config.config
            return player
        })
        // TODO: あとでけす
        console.log(MusicPlayerManager.musicplayers)
        this.players = [
            new MusicPlayerManager.musicplayers.itunes_mac()
        ]
        const worlds = ((config.worlds || []) as {key: string, config: {[key: string]: any}}[])
        this.worlds = worlds.map(world_config => {
            const world_class = WorldManager.worlds[world_config.key]
            const world = new world_class()
            world.config = world_config
            return world
        })
    }
}

var config = new Config()

export default config