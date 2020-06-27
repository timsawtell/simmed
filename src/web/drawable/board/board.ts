import { Square } from "./square"
import { World } from "../../../world/world"
import { Drawable } from "../drawable"
import { Entity } from "../../../entities/base"

export const TRAVEL_COST = 10
const squareWidth = 10
// const sceneryPercent = 0.1

export enum Direction {
    "left",
    "right",
    "up",
    "down",
}

export class Board extends Drawable {
    squares: Square[][]
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
                const square = new Square(squareWidth)
                square.positionX = xStep * squareWidth
                square.positionY = yStep * squareWidth
                this.squares[yStep][xStep] = square
            }
        }
    }

    resetBoard(): void {
        for (let i = 0; i < this.numberOfXSquares; i++) {
            for (let j = 0; j < this.numberOfYSquares; j++) {
                this.squares[j][i].contents = []
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

    squareForEntity(entity: Entity): Square | null {
        for (let yStep = 0; yStep < this.numberOfYSquares; yStep++) {
            for (let xStep = 0; xStep < this.numberOfXSquares; xStep++) {
                if (this.squares[yStep][xStep].contents.includes(entity)) {
                    return this.squares[yStep][xStep]
                }
            }
        }
        return null
    }

    /**
     * This is so bad, need to make it understandable. TODO: be good
     * @param square
     */
    neighbors(square: Square): Square[] {
        const neighbors: Square[] = []
        const north =
            square.positionY / squareWidth > 0
                ? this.squares[square.positionY / squareWidth - 1][square.positionX / squareWidth]
                : null
        const south =
            square.positionY / squareWidth < this.numberOfYSquares - 1
                ? this.squares[square.positionY / squareWidth + 1][square.positionX / squareWidth]
                : null
        const east =
            square.positionX / squareWidth < this.numberOfXSquares - 1
                ? this.squares[square.positionY / squareWidth][square.positionX / squareWidth + 1]
                : null
        const west =
            square.positionX / squareWidth > 0
                ? this.squares[square.positionY / squareWidth][square.positionX / squareWidth - 1]
                : null
        if (!!north && !north.isImpassable()) {
            neighbors.push(north)
        }
        if (!!south && !south.isImpassable()) {
            neighbors.push(south)
        }
        if (!!east && !east.isImpassable()) {
            neighbors.push(east)
        }
        if (!!west && !west.isImpassable()) {
            neighbors.push(west)
        }
        return neighbors
    }

    hCostForSquare(start: Square, end: Square) {
        const xCost = Math.abs(start.positionX - end.positionX)
        const yCost = Math.abs(start.positionY - end.positionY)
        return xCost * TRAVEL_COST + yCost * TRAVEL_COST
    }
}
