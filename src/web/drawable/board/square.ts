import { Drawable } from "../drawable"
import { Entity } from "../../../entities/base"
import { BOARD_SCALE } from "../../../simulation/simulation"

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

    drawViruses(context: CanvasRenderingContext2D) {
        if (this.contents.length > 0) {
            this.contents.forEach((entity) => {
                entity.viruses.forEach((virus) => {
                    context.beginPath()
                    context.arc(
                        this.canvasVector.x + this.width / 2,
                        this.canvasVector.y + this.width / 2,
                        100,
                        0,
                        2 * Math.PI
                    )
                    context.stroke()
                })
            })
        }
    }

    draw(context: CanvasRenderingContext2D) {
        super.draw(context)

        //draw your own border
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
    }
}
