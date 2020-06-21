import { Drawable } from "../drawable"
import { Entity } from "../../../entities/base"

export type SquareContents = string | "_blank"

export class Square extends Drawable {
    width: number
    contents: Entity[]
    isRed: boolean

    constructor(row: number, column: number, width: number) {
        super()
        this.boardVector.y = row
        this.boardVector.x = column
        this.width = this.height = width
        this.contents = []
        this.isRed = false
    }

    draw(context: CanvasRenderingContext2D) {
        super.draw(context)

        //draw your own border
        context.save()
        context.beginPath()
        context.strokeStyle = "black"
        context.lineWidth = 1
        context.moveTo(this.canvasVector.x, this.canvasVector.y)
        context.lineTo(this.canvasVector.x + this.width, this.canvasVector.y)
        context.lineTo(this.canvasVector.x + this.width, this.canvasVector.y + this.width)
        context.lineTo(this.canvasVector.x, this.canvasVector.y + this.width)
        context.lineTo(this.canvasVector.x, this.canvasVector.y)
        context.stroke()
        context.font = "18px Arial"
        // draw your contents
        if (this.contents.length > 0) {
            context.fillText(
                this.contents.map((entity) => entity.name).join(","),
                this.canvasVector.x,
                this.canvasVector.y + 10,
                this.width
            )
        }

        if (this.isRed) {
            context.fillStyle = "red"
            context.fill()
        }

        context.restore()
    }
}
