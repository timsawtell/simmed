import { Entity } from "./base"
import { Virus } from "./virus"
import { World } from "../world/world"

export type Instruction = "meander-horizontal" | "meander-vertical" | "wander" | "stationary"
export type Direction = "up" | "down" | "left" | "right"

export class Human extends Entity {
    world: World
    viruses: Virus[]
    instruction: Instruction

    constructor(name: string, world: World) {
        super()
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

    tick(tickNumber: number, elapsedTime: number): void {
        this.move()
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
}
