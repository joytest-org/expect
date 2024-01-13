import toBeOfType from "./toBeOfType.mjs"
import invert from "./invert.mjs"

export default function not_toBeOfType(...args) {
	invert.call(this, "toBeOfType", toBeOfType, ...args)
}
