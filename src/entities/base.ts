import { Virus } from "./virus"
import { Drawable } from "../web/drawable/drawable"
import { World } from "../world/world"
import { Board } from "../web/drawable/board/board"

export abstract class Entity extends Drawable {
    public positionZ: number
    public viruses: Virus[]
    public type: "human" | "busstop" | "undefined" | "scenery"
    public name: string

    constructor() {
        super()
        this.positionZ = 0
        this.viruses = []
        this.type = "undefined"
        this.name = ""
    }

    abstract tick(tickNumber: number, elapsedTime: number, world: World, board?: Board): void

    distanceTo(entity: Entity): number {
        const a = this.positionX - entity.positionX
        const b = this.positionY - entity.positionY
        const c = this.positionZ - entity.positionZ
        const d = Math.sqrt(a * a + b * b + c * c)
        return d
    }

    receiveVirus(virus: Virus): void {
        // only receive the virus if you don't already have it
        if (this.viruses.map((virus) => virus.name).indexOf(virus.name) < 0) {
            const newVirus = virus.mutation()
            this.viruses.push(newVirus)
            console.log(`I am: ${this.name} and I just caught ${virus.name}`)
        } else {
            "Someone tried to give me a virus I already have lmao"
        }
    }

    draw(context: CanvasRenderingContext2D): void {
        // implement me
        super.draw(context)
    }

    clear(context: CanvasRenderingContext2D): void {
        context.clearRect(this.positionX, this.positionY, this.drawableWidth, this.drawableHeight)
    }

    move(deltaX: number, deltaY: number) {
        this.positionX = this.positionX + deltaX
        this.positionY = this.positionY + deltaY
    }
}
