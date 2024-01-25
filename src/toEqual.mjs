import unwrap from "@anio-js-core-foundation/unwrap-primitive-value"
import isPrimitive from "@anio-js-core-foundation/is-primitive"
import comparePrototype from "./lib/objectComparePrototype.mjs"
import diffProperties from "./lib/objectDiffProperties.mjs"

import toStr from "../safeToString.mjs"

function compare(expected, value) {
	const context = this.context

	if (isPrimitive(expected)) {
		if (expected !== unwrap(value)) {
			return context.throw_ExpectationNotMetError(
				`Expected '${toStr(expected)}' but got '${toStr(value)}'.`
			)
		}

		return
	}

	if (!comparePrototype(value, expected)) {
		return context.throw_ExpectationNotMetError(
			`Values do not have same prototype.`
		)
	}

	const diff = diffProperties(value, expected)

	if (diff.length) {
		return context.throw_ExpectationNotMetError(
			`Values have different properties:\n` +
			diff.join("\n")
		)
	}

	for (const key in expected) {
		compare.call(this, expected[key], value[key])
	}
}

export default function toEqual(expected, value) {
	compare.call(this, expected, value)
}
