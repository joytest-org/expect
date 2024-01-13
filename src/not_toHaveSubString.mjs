import toHaveSubString from "./toHaveSubString.mjs"
import invert from "./invert.mjs"

export default function not_toHaveSubString(...args) {
	invert.call(this, "toHaveSubString", toHaveSubString, ...args)
}
