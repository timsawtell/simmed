import { Virus } from "./virus"

export abstract class Entity {
    public positionX: number
    public positionY: number
    public positionZ: number
    public viruses: Virus[]
    public type: string
    public name: string

    constructor() {
        this.positionX = 0
        this.positionY = 0
        this.positionZ = 0
        this.viruses = []
        this.type = ""
        this.name = ""
    }

    abstract tick(tickNumber: number, elapsedTime: number): void

    distanceTo(entity: Entity): number {
        const a = this.positionX - entity.positionX
        const b = this.positionY - entity.positionY
        const c = this.positionZ - entity.positionZ
        const d = Math.sqrt(a * a + b * b + c * c)
        return d
    }

    receiveVirus(virus: Virus): void {
        // only receive the virus if you don't already have it
        if (this.viruses.map((virus) => virus.name).indexOf(virus.name) < 0) {
            const newVirus = virus.mutation()
            this.viruses.push(newVirus)
            console.log(`I am: ${this.name} and I just caught ${virus.name}`)
        } else {
            "Someone tried to give me a virus I already have lmao"
        }
    }
}
