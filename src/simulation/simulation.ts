import { World } from "../world/world"
import { Engine } from "../engine/engine"
import { Human } from "../entities/human"
import { TheFlu } from "../entities/virus"
import { Board } from "../web/drawable/board/board"

export const BOARD_SCALE = 10

export class Simulation {
    engine?: Engine

    run(board?: Board): void {
        const world = new World()

        const humanA = new Human("Bob", world)
        const humanB = new Human("Alice", world)

        // Give Bob TheFlu
        humanA.viruses.push(new TheFlu())

        // Move Bob away
        humanA.positionX = 245
        humanA.positionY = 266

        // Make Alice wander around
        humanB.instruction = "wander"

        // Make Bob stay still
        humanA.instruction = "stationary"

        world.addEntity(humanA)
        world.addEntity(humanB)

        this.engine = new Engine(world, board)
        this.engine.start()
    }
}
