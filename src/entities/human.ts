import { Entity } from "./base"
import { Virus } from "./virus"
import { World } from "../world/world"
import { Drawable } from "../web/drawable/drawable"

export type Instruction = "meander-horizontal" | "meander-vertical" | "wander" | "stationary"
export type Direction = "up" | "down" | "left" | "right"

export class Human extends Entity implements Drawable {
    world: World
    viruses: Virus[]
    instruction: Instruction

    constructor(name: string, world: World, age?: number) {
        super(age || 22)
        this.world = world
        this.viruses = []
        this.type = "Human"
        this.name = name
        this.instruction = "stationary"
    }

    move(): void {
        let direction: Direction | undefined
        switch (this.instruction) {
            case "meander-vertical":
                direction = Math.random() > 0.5 ? "up" : "down"
                break
            case "meander-horizontal":
                direction = Math.random() > 0.5 ? "left" : "right"
                break
            case "wander": {
                const random = Math.random()
                if (random < 0.25) {
                    direction = "down"
                    break
                }
                if (random < 0.5) {
                    direction = "left"
                    break
                }
                if (random < 0.75) {
                    direction = "right"
                    break
                }
                direction = "up"
                break
            }
        }
        switch (direction) {
            case "down":
                this.positionY -= 20
                break
            case "up":
                this.positionY += 20
                break
            case "left":
                this.positionX -= 20
                break
            case "right":
                this.positionX += 20
                break
        }
        this.positionX = Math.max(this.positionX, 0)
        this.positionY = Math.max(this.positionY, 0)
    }

    // heal(): void {

    // }

    die(): void {
        const random = Math.random()
        this.viruses.forEach((virus) => {
            if (this.isAlive && random < virus.determineMortalityRate(this)) {
                this.isAlive = false
                this.diedFrom = virus
            }
        })
    }

    tick(tickNumber: number, elapsedTime: number): void {
        if (this.isAlive) {
            this.move()
            this.die()
        }
        if (this.viruses.length > 0) {
            this.world.entities.forEach((entity: Entity) => {
                this.viruses.forEach((virus) => {
                    const randomChance = Math.random()
                    if (virus.probabilityOfTransmission(this, entity) >= randomChance) {
                        entity.receiveVirus(virus)
                    }
                })
            })
        }
    }

    draw(context: CanvasRenderingContext2D): void {
        super.draw(context)
        context.save()
        context.beginPath()
        context.strokeStyle = "red"
        context.lineWidth = 1
        context.stroke()

        context.font = "16px Arial"
        let displayName = this.name
        if (!this.isAlive) {
            displayName += " 💀"
        }

        let nameX = this.positionX - displayName.length * 3.5
        nameX = Math.max(0, nameX)
        const nameY = Math.max(20, this.positionY)

        context.fillText(displayName, nameX, nameY)
        context.fillText(`age: ${this.age}`, nameX, nameY + 20)
        this.drawViruses(context)
        context.restore()
    }

    /**
     * Draw a circle around the player to indicate the types of virus that they are carrying
     * @param context
     */
    drawViruses(context: CanvasRenderingContext2D): void {
        this.viruses.forEach((virus) => {
            context.beginPath()
            context.arc(
                this.positionX + this.drawableWidth / 2,
                this.positionY + this.drawableHeight / 2,
                virus.minimumDistanceBetweenEntitiesForTransmission,
                0,
                2 * Math.PI
            )
            context.stroke()
        })
    }
}
