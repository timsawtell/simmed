import { Entity } from "../entities/base"

interface Space {
    x: number
    y: number
    z: number
}

export class World {
    entities: Entity[]

    constructor() {
        this.entities = []
    }

    addEntity(entity: Entity, positionX?: number, positionY?: number, positionZ?: number): void {
        if (positionX) {
            entity.positionX = positionX
        }
        if (positionY) {
            entity.positionY = positionY
        }
        if (positionZ) {
            entity.positionZ = positionZ
        }
        this.entities.push(entity)
    }
}
