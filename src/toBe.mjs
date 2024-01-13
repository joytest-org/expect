import toStr from "../safeToString.mjs"

export default function toBe(expected, value) {
	const context = this.context

	if (!Object.is(expected, value)) {
		return context.throw_ExpectationNotMetError(
			`Expected '${toStr(value)}' to be '${toStr(expected)}'.`
		)
	}
}
