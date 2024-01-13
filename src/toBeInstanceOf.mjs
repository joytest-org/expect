import toStr from "../safeToString.mjs"

export default function toBeInstanceOf(expected, value) {
	const context = this.context

	if (!(value instanceof expected)) {
		let name = "<###>"

		if ("name" in expected) {
			name = toStr(expected.name)
		}

		return context.throw_ExpectationNotMetError(
			`Expected value to be instance of '${name}'.`
		)
	}
}
