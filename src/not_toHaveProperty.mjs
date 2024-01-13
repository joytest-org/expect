import toHaveProperty from "./toHaveProperty.mjs"
import invert from "./invert.mjs"

export default function not_toHaveProperty(...args) {
	invert.call(this, "toHaveProperty", toHaveProperty, ...args)
}
