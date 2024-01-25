import unwrap from "@anio-js-core-foundation/unwrap-primitive-value"

export default function toThrowError(fn, expectedErrorMessage = undefined) {
	const context = this.context

	let thrownError = null

	if (typeof fn !== "function") {
		return context.throw_ValidationError(
			`Value is not callable.`
		)
	}

	const checkErrorMessage = typeof expectedErrorMessage !== "undefined"

	if (checkErrorMessage) {
		if (typeof unwrap(expectedErrorMessage) !== "string") {
			return context.throw_ValidationError(
				`Expected error message must be a string.`
			)
		}
	}

	try {
		fn()
	} catch (error) {
		thrownError = error
	}

	if (thrownError === null) {
		return context.throw_ExpectationNotMetError(
			`Function expected to throw, but it did not.`
		)
	} else if (checkErrorMessage) {
		const thrownErrorMessage = thrownError.message ? thrownError.message : ""

		if (!thrownErrorMessage.includes(expectedErrorMessage)) {
			return context.throw_ExpectationNotMetError(
				`Expected error message to include substring '${expectedErrorMessage}'.`
			)
		}
	}
}
