import { Human } from "../src/entities/human"
import { World } from "../src/world/world"

describe("Entity tests", () => {
    it("Can determine distances correctly", () => {
        const world = new World()
        const a = new Human("Bob", world)
        const b = new Human("Alice", world)

        // 2d Movement
        a.positionX = 0
        a.positionY = 0

        b.positionX = 1
        b.positionY = 1

        expect(a.distanceTo(b)).toBe(1.4142135623730951)

        b.positionX = 0
        b.positionY = 0
        expect(a.distanceTo(b)).toBe(0)

        b.positionX = -1
        b.positionY = -1
        expect(a.distanceTo(b)).toBe(1.4142135623730951)

        b.positionX = 1
        b.positionY = -1
        expect(a.distanceTo(b)).toBe(1.4142135623730951)

        b.positionX = -1
        b.positionY = 1
        expect(a.distanceTo(b)).toBe(1.4142135623730951)

        // 3d movement
        b.positionX = 0
        b.positionY = 0
        b.positionZ = 1
        expect(a.distanceTo(b)).toBe(1)

        b.positionX = 1
        b.positionY = 1
        b.positionZ = 1
        expect(a.distanceTo(b)).toBe(1.7320508075688772)
    })
})
