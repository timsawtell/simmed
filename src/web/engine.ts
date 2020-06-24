import { Board } from "./drawable/board/board"
import { Simulation } from "../simulation/simulation"

export class WebEngine {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D | null
    board: Board

    constructor() {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement
        this.context = this.canvas.getContext("2d")

        this.board = new Board(this.canvas.width, this.canvas.height, this.context)
        this.board.canvasVector.x = this.board.canvasVector.y = 0

        this.context && this.board.draw(this.context)
    }
}

window.onload = () => {
    const webEngine = new WebEngine()
    const simulation = new Simulation()
    simulation.run(webEngine.board)
}
