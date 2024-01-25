import unwrap from "@anio-js-core-foundation/unwrap-primitive-value"

export default function toHaveSubString(string, substring) {
	const context = this.context

	string = unwrap(string)
	substring = unwrap(substring)

	if (typeof string !== "string") {
		return context.throw_ValidationError(
			`Value must be a string.`
		)
	} else if (typeof substring !== "string") {
		return context.throw_ValidationError(
			`Substring must be a string.`
		)
	}

	if (!string.includes(substring)) {
		return context.throw_ExpectationNotMetError(
			`String '${string}' does not contain substring '${substring}'.`
		)
	}
}
