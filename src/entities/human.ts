import { Entity } from "./base"
import { Virus } from "./virus"
import { World } from "../world/world"

export class Human extends Entity {
    world: World
    viruses: Virus[]

    constructor(name: string, world: World) {
        super()
        this.world = world
        this.viruses = []
        this.type = "Human"
        this.name = name
    }

    tick(tickNumber: number, elapsedTime: number): void {
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
