import toStr from "../safeToString.mjs"

export default function invert(label, fn, ...args) {
	const context = this.context

	let result = false

	context.ignoreExpectationNotMetErrors = true
	try {
		fn.call({context}, ...args)
	} catch (error) {
		if (
			error.message.startsWith("<@anio-js-foundation/expect> ExpectationNotMet: ")
		) {
			result = true
		} else {
			throw error
		}
	} finally {
		context.ignoreExpectationNotMetErrors = false
	}

	if (!result) {
		switch (label) {
			case "toBe": {
				const [expected, value] = args

				return context.throw_ExpectationNotMetError(
					`Expected '${value}' not to be '${expected}'.`
				)
			} break

			case "toEqual": {
				const [expected, value] = args

				return context.throw_ExpectationNotMetError(
					`Expected values not to be equal.`
				)
			} break

			case "toHaveProperty": {
				const [object, propName] = args

				return context.throw_ExpectationNotMetError(
					`Expected object not to have property '${propName}'.`
				)
			} break

			case "toHaveSubString": {
				const [string, substring] = args

				return context.throw_ExpectationNotMetError(
					`Expected '${string}' not to have substring '${substring}'.`
				)
			} break

			case "toBeOfType": {
				const [expected, actual] = args

				return context.throw_ExpectationNotMetError(
					`Expected value not to be of type '${expected}'.`
				)
			} break

			case "toBeInstanceOf": {
				const [expected, actual] = args

				let name = "<###>"

				if ("name" in expected) {
					name = toStr(expected.name)
				}

				return context.throw_ExpectationNotMetError(
					`Expected value not to be instance of '${name}'.`
				)
			} break
		}

		return context.throw_ExpectationNotMetError(
			`Expected ${label}() to fail.`
		)
	}
}
