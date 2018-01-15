import { IMusicPlayer, MusicPlayerManager } from "./plugins/core/musicplayer";
import { IWorld, WorldManager } from "./plugins/core/world";
import "./plugins"

class Config {
    players: {[key: string]: IMusicPlayer} = {}
    worlds: {[key: string]: IWorld} = {}
    constructor() {
        const config: any = JSON.parse(localStorage.getItem("nowplayinger.config") || "{}")
        const players = ((config.players || []) as {key: string, config: {[key: string]: any}}[])
        players.filter(player_config => {
            const player_class = MusicPlayerManager.musicplayers[player_config.key]
            const player = new player_class()
            player.config = player_config.config
            this.players[player.getUniqueKey()] = player
        })
        const worlds = ((config.worlds || []) as {key: string, config: {[key: string]: any}}[])
        worlds.filter(world_config => {
            const world_class = WorldManager.worlds[world_config.key]
            const world = new world_class()
            world.config = world_config
            this.worlds[world.getUniqueKey()] = world
        })
        // TODO: あとでけす
        const test_players = [
            new MusicPlayerManager.musicplayers.itunes_mac() as IMusicPlayer,
            new MusicPlayerManager.musicplayers.fake() as IMusicPlayer,
        ]
        test_players.forEach(player => {
            this.players[player.getUniqueKey()] = player
        })
        const test_worlds = [
            new WorldManager.worlds.fake() as IWorld,
            new WorldManager.worlds.twitter() as IWorld
        ]
        test_worlds.forEach(world => {
            this.worlds[world.getUniqueKey()] = world
        })
    }
}

var config = new Config()

export default config