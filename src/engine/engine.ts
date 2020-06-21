import { World } from "../world/world"

export class Engine {
    private world: World
    private ticks: number
    private startTime: number

    constructor(world: World) {
        this.world = world
        this.ticks = 0
        this.tick = this.tick.bind(this)
        this.startTime = 0
    }

    start(): void {
        this.startTime = new Date().getMilliseconds()
        this.tick()
    }

    tick(): void {
        this.world.entities.forEach((entity) => {
            entity.tick(this.ticks, new Date().getMilliseconds() - this.startTime)
        })

        this.ticks++
        const infected = this.world.entities.filter((entity) => {
            return entity.viruses.length > 0
        }).length

        if (infected >= this.world.entities.length) {
            console.log("Everyone is infected")
            return
        }

        setTimeout(this.tick, 100)

        console.log(`Tick: ${this.ticks}`)
        console.log(`Infected people: ${infected}`)
    }
}
