import { Square } from "./square"
import { World } from "../../../world/world"
import { Drawable } from "../drawable"
// import { Player } from "../player/player"

const squareWidth = 20
// const sceneryPercent = 0.1

export enum Direction {
    "left",
    "right",
    "up",
    "down",
}

export class Board extends Drawable {
    squares: Square[][]
    //player: Player
    numberOfXSquares: number
    numberOfYSquares: number
    gameOver: boolean
    context: CanvasRenderingContext2D

    constructor(width: number, height: number, context: CanvasRenderingContext2D) {
        super()
        this.drawableWidth = width
        this.drawableHeight = height
        this.numberOfXSquares = width / squareWidth
        this.numberOfYSquares = height / squareWidth
        this.gameOver = false
        this.context = context

        this.squares = []
        for (let yStep = 0; yStep < this.numberOfYSquares; yStep++) {
            this.squares[yStep] = []
            for (let xStep = 0; xStep < this.numberOfXSquares; xStep++) {
                const square = new Square(yStep, xStep, squareWidth)
                square.positionX = xStep * squareWidth
                square.positionY = yStep * squareWidth
                this.squares[yStep][xStep] = square
            }
        }
    }

    resetBoard(): void {
        for (let i = 0; i < this.numberOfXSquares; i++) {
            for (let j = 0; j < this.numberOfYSquares; j++) {
                this.squares[i][j].contents = []
            }
        }
    }

    tick(tickNumber: number, elapsedTime: number, world: World): void {
        if (world) {
            this.resetBoard()
            world.entities.forEach((entity) => {
                const x = entity.positionX
                const y = entity.positionY
                const xSquare = Math.min(this.numberOfXSquares - 1, Math.floor(Math.max(x / squareWidth, 0)))
                const ySquare = Math.min(this.numberOfYSquares - 1, Math.floor(Math.max(y / squareWidth, 0)))
                this.squares[ySquare][xSquare].contents.push(entity)
            })
        }
        this.draw(this.context)
    }

    draw(context: CanvasRenderingContext2D): void {
        super.draw(context)
        const numberOfXSquares = this.drawableWidth / squareWidth
        const numberOfYSquares = this.drawableHeight / squareWidth
        for (let yStep = 0; yStep < numberOfYSquares; yStep++) {
            for (let xStep = 0; xStep < numberOfXSquares; xStep++) {
                this.squares[yStep][xStep].draw(context)
            }
        }
    }
}
