export interface IWorld {
    config: {[key: string]: any}
    post: (content: string) => Promise<void>
    getUniqueKey: () => string
    getDisplayName: () => string
}

interface IWorldStatic {
    new (): IWorld
    key: string
}

export class WorldManager {
    static worlds: {[key: string]: IWorldStatic} = {}
    static addWorld(world: IWorldStatic) {
        if (WorldManager.worlds[world.key]) {
            throw "already added this world"
        }
        WorldManager.worlds[world.key] = world
    }
}
