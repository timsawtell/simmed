import { Entity } from "./base"
import { BOARD_SCALE } from "../simulation/simulation"
import { Human } from "./human"

export abstract class Virus {
    name: string
    carriers: string[]
    affects: string[]
    chanceOfTransmission: number
    /** in meters */
    minimumDistanceBetweenEntitiesForTransmission: number
    /** duration in days */
    durationOfIllness: number
    /** timestamp of when it was acquired */
    timeAcquired: number

    constructor() {
        this.name = ""
        this.carriers = []
        this.affects = []
        this.chanceOfTransmission = 0
        this.minimumDistanceBetweenEntitiesForTransmission = 0
        this.durationOfIllness = 7
        this.timeAcquired = 0
    }

    abstract probabilityOfTransmission(entityA: Entity, entityB: Entity): number
    abstract mutation(): Virus
    abstract determineMortalityRate(entity: Entity): number
}

export class TheFlu extends Virus {
    constructor() {
        super()
        this.name = "TheFlu"
        this.affects = ["Human"]
        this.carriers = ["Human"]
        this.chanceOfTransmission = 0.2
        this.minimumDistanceBetweenEntitiesForTransmission = 5.5 * BOARD_SCALE
        this.timeAcquired = new Date().getSeconds()
    }

    determineMortalityRate(entity: Entity): number {
        if (entity.type === "human") {
            const human = entity as Human
            if (human.age < 3) {
                return 0.1
            } else if (human.age < 65) {
                return 0.001
            }
            return 0.01
        }
        return 0
    }

    probabilityOfTransmission(fromEntity: Entity, toEntity: Entity): number {
        // only allow transmission between entities that are carriers
        if (this.carriers.indexOf(fromEntity.type) < 0 || this.carriers.indexOf(toEntity.type)) {
            return 0
        }

        // only allow transmission if the `fromEntity` has this virus
        if (fromEntity.viruses.map((virus: Virus) => virus.name).indexOf(this.name) < 0) {
            return 0
        }

        // only allow transmission if the distance between the entities is small enough
        if (fromEntity.distanceTo(toEntity) > this.minimumDistanceBetweenEntitiesForTransmission) {
            return 0
        }

        return this.chanceOfTransmission
    }

    mutation(): TheFlu {
        const newInstance = new TheFlu()
        newInstance.affects = this.affects
        newInstance.carriers = this.carriers
        newInstance.chanceOfTransmission = this.chanceOfTransmission

        // Todo: alter these properties based on chance
        return newInstance
    }
}
