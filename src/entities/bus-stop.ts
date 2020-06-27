import { Entity } from "./base"
import { Drawable } from "../web/drawable/drawable"
import { World } from "../world/world"
import { Board } from "../web/drawable/board/board"

export class BusStop extends Entity implements Drawable {
    constructor() {
        super()
        this.type = "busstop"
    }

    tick(tickNumber: number, elapsedTime: number, world: World, board: Board): void {
        //
    }

    draw(context: CanvasRenderingContext2D): void {
        super.draw(context)
        context.save()
        context.fillStyle = "black"
        context.fillRect(this.positionX, this.positionY, this.drawableWidth, this.drawableHeight)
        context.restore()
    }
}
