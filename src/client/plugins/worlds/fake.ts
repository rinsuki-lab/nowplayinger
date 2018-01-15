import { IWorld, WorldManager } from "../core/world";

class FakeWorld implements IWorld {
    static key = "fake"
    config: {}
    async post(content: string) {
        alert(content)
    }
    getUniqueKey() {
        return "fake"
    }

    getDisplayName() {
        return "fake world"
    }

    static async auth() {
        return new FakeWorld()
    }
}

WorldManager.addWorld(FakeWorld)