import { World } from "../world/world"
import { Engine } from "../engine/engine"
import { Human } from "../entities/human"
import { TheFlu } from "../entities/virus"
import { Board } from "../web/drawable/board/board"
import { BusStop } from "../entities/bus-stop"
import { Square } from "../web/drawable/board/square"

export const BOARD_SCALE = 10

export class Simulation {
    engine?: Engine
    world: World
    board?: Board
    numberOfHumans: number

    constructor(numberOfHumans: number) {
        this.world = new World()
        this.numberOfHumans = numberOfHumans
        this.addNewHuman = this.addNewHuman.bind(this)
    }

    run(board?: Board): void {
        this.board = board
        // const humanA = new Human("Bob", world, 83)
        // const humanB = new Human("Alice", world)

        // // Give Bob TheFlu
        // humanA.viruses.push(new TheFlu())

        // // Move Bob away
        // humanA.positionX = 245
        // humanA.positionY = 266

        // // Make Alice wander around
        // humanB.instruction = "wander"

        // // Make Bob stay still
        // humanA.instruction = "wander"

        // world.addEntity(humanA)
        // world.addEntity(humanB)

        this.addNewHuman()
        const busStop = new BusStop()
        busStop.positionX = 200
        busStop.positionY = 200
        busStop.drawableHeight = (board?.squares[0][0] as Square).drawableHeight
        busStop.drawableWidth = (board?.squares[0][0] as Square).drawableWidth
        this.world.entities.push(busStop)

        this.engine = new Engine(this.world, board)
        this.engine.start()
    }

    addNewHuman(): void {
        const age = Math.round(Math.random() * 100)
        const human = new Human(`Person ${this.world?.entities.length}`, this.world, age)
        human.instruction = "wander"
        if (this.board) {
            const randomX = Math.min(Math.random() * this.board?.drawableWidth, this.board?.drawableWidth)
            const randomY = Math.min(Math.random() * this.board?.drawableHeight, this.board?.drawableHeight)
            human.positionX = randomX
            human.positionY = randomY
        }
        const hasVirus = Math.random() < 0.1
        if (hasVirus) {
            human.viruses.push(new TheFlu())
        }
        this.world.addEntity(human)
        if (this.world.entities.length < this.numberOfHumans) {
            setTimeout(this.addNewHuman, 500)
        }
    }
}
