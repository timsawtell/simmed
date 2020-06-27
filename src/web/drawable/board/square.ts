import { Entity } from "../../../entities/base"
import { Drawable } from "../drawable"

export type SquareContents = string | "_blank"
interface PathfindingData {
    gCost: number
    hCost: number
    fCost: number
}

export class Square extends Drawable {
    contents: Entity[]
    pathFindingData: PathfindingData

    constructor(width: number) {
        super()
        this.drawableWidth = this.drawableHeight = width
        this.contents = []
        this.pathFindingData = { hCost: 0, fCost: 0, gCost: 0 }
    }

    isImpassable(): boolean {
        for (let i = 0; i < this.contents.length; i++) {
            if (this.contents[i].type === "scenery") {
                return true
            }
        }
        return false
    }

    resetPathfinding(): void {
        this.pathFindingData = {
            gCost: 0,
            hCost: 0,
            fCost: 0,
        }
    }

    draw(context: CanvasRenderingContext2D): void {
        super.draw(context)

        //draw your own border
        context.beginPath()
        context.strokeStyle = "grey"
        context.lineWidth = 1
        context.moveTo(this.positionX, this.positionY)
        context.lineTo(this.positionX + this.drawableWidth, this.positionY)
        context.lineTo(this.positionX + this.drawableWidth, this.positionY + this.drawableWidth)
        context.lineTo(this.positionX, this.positionY + this.drawableWidth)
        context.lineTo(this.positionX, this.positionY)
        context.stroke()

        // We need to do a setTimeout here so that all the squares get drawn before the entities
        // are then overlaid on top of the entire board. Drawing a square clears out the area that
        // a previous square may have used (e.g. to render a virus distance)
        setTimeout(() => {
            this.contents.forEach((entity) => {
                entity.draw(context)
            })
        })
    }
}
