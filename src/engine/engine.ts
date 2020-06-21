import { World } from "../world/world"
import { Board } from "../web/drawable/board/board"

export class Engine {
    private world: World
    private ticks: number
    private startTime: number
    private board?: Board

    constructor(world: World, board?: Board) {
        this.world = world
        this.ticks = 0
        this.tick = this.tick.bind(this)
        this.startTime = 0
        this.board = board
    }

    start(): void {
        this.startTime = new Date().getMilliseconds()
        this.tick()
    }

    tick(): void {
        this.world.entities.forEach((entity) => {
            entity.tick(this.ticks, new Date().getMilliseconds() - this.startTime)
        })

        if (this.board) {
            this.board.tick(this.ticks, new Date().getMilliseconds() - this.startTime, this.world)
        }

        this.ticks++
        const infected = this.world.entities.filter((entity) => {
            return entity.viruses.length > 0
        }).length

        if (infected >= this.world.entities.length) {
            console.log("Everyone is infected")
            return
        }

        setTimeout(this.tick, 100)

        console.log("Distance: " + this.world.entities[0].distanceTo(this.world.entities[1]))
    }
}
