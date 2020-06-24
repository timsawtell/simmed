import { Drawable } from "../drawable"

export class Person extends Drawable {
    draw(context: CanvasRenderingContext2D): void {
        context.save()
        context.beginPath()
        context.strokeStyle = "red"
        context.lineWidth = 1
        context.arc(this.canvasVector.x, this.canvasVector.y, 5, 0, 2 * Math.PI)
        context.stroke()
        context.restore()
    }
}
