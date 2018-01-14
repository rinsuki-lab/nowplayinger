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
}

WorldManager.addWorld(FakeWorld)