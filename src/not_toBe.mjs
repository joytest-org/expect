import toBe from "./toBe.mjs"
import invert from "./invert.mjs"

export default function not_toBe(...args) {
	invert.call(this, "toBe", toBe, ...args)
}
