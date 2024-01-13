import toBeInstanceOf from "./toBeInstanceOf.mjs"
import invert from "./invert.mjs"

export default function not_toBeInstanceOf(...args) {
	invert.call(this, "toBeInstanceOf", toBeInstanceOf, ...args)
}
