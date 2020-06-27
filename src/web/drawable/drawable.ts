export abstract class Drawable {
    public drawableWidth: number
    public drawableHeight: number
    public positionX: number
    public positionY: number

    constructor() {
        this.drawableHeight = 0
        this.drawableWidth = 0
        this.positionX = 0
        this.positionY = 0
    }

    draw(context: CanvasRenderingContext2D): void {
        this.clear(context)
    }

    clear(context: CanvasRenderingContext2D): void {
        context.clearRect(this.positionX, this.positionY, this.drawableWidth, this.drawableHeight)
    }
}
