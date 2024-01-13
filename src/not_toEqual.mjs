import toEqual from "./toEqual.mjs"
import invert from "./invert.mjs"

export default function not_toEqual(...args) {
	invert.call(this, "toEqual", toEqual, ...args)
}
