export interface IWorld {
    config: {[key: string]: any}
    post: (content: string) => Promise<void>
    getUniqueKey: () => string
    getDisplayName: () => string
}

export interface IWorldStatic {
    new (): IWorld
    key: string
    auth: () => Promise<IWorld | undefined>
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
