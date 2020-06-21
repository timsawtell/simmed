import { World } from "../world/world"
import { Engine } from "../engine/engine"
import { Human } from "../entities/human"
import { TheFlu } from "../entities/virus"

export class Simulation {
    engine?: Engine

    run(): void {
        const world = new World()

        const humanA = new Human("Bob", world)
        const humanB = new Human("Alice", world)

        // Give Bob TheFlu
        humanA.viruses.push(new TheFlu())

        world.addEntity(humanA)
        world.addEntity(humanB)

        this.engine = new Engine(world)
        this.engine.start()
    }
}

const simulation = new Simulation()
simulation.run()
