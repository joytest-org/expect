import toBe_fn from "./src/toBe.mjs"
import toEqual_fn from "./src/toEqual.mjs"
import toHaveProperty_fn from "./src/toHaveProperty.mjs"
import toHaveSubString_fn from "./src/toHaveSubString.mjs"
import toThrowError_fn from "./src/toThrowError.mjs"
import toBeOfType_fn from "./src/toBeOfType.mjs"
import toBeInstanceOf_fn from "./src/toBeInstanceOf.mjs"

import notToBe_fn from "./src/not_toBe.mjs"
import notToEqual_fn from "./src/not_toEqual.mjs"
import notToHaveProperty_fn from "./src/not_toHaveProperty.mjs"
import notToHaveSubString_fn from "./src/not_toHaveSubString.mjs"
import notToBeOfType_fn from "./src/not_toBeOfType.mjs"
import notToBeInstanceOf_fn from "./src/not_toBeInstanceOf.mjs"

function throwError(msg) {
	throw new Error(`<@anio-js-foundation/expect> ${msg}`)
}

export function createExpectationsContext() {
	let context = {
		errors: [],
		expectedAssertions: null,
		ignoreExpectationNotMetErrors: false,
		madeAssertions: 0,
		onErrorHandler() {},
		throw_ValidationError(message) {
			context.errors.push(`ValidationError: ${message}`)

			context.onErrorHandler(`ValidationError: ${message}`)
			throwError(
				`ValidationError: ${message}`
			)
		},
		throw_ExpectationNotMetError(message) {
			if (!context.ignoreExpectationNotMetErrors) {
				context.errors.push(`ExpectationNotMet: ${message}`)
			}

			context.onErrorHandler(`ExpectationNotMet: ${message}`)
			throwError(
				`ExpectationNotMet: ${message}`
			)
		}
	}

	const expect = function(value) {
		return {
			toBe(expected) {
				toBe_fn.call({context}, expected, value)
				context.madeAssertions++
			},
			toEqual(expected) {
				toEqual_fn.call({context}, expected, value)
				context.madeAssertions++
			},
			toHaveProperty(propName, propValue = undefined) {
				toHaveProperty_fn.call({context}, value, propName, propValue)
				context.madeAssertions++
			},
			toHaveSubString(substring) {
				toHaveSubString_fn.call({context}, value, substring)
				context.madeAssertions++
			},
			toThrowError(expectedErrorMessage) {
				toThrowError_fn.call({context}, value, expectedErrorMessage)
				context.madeAssertions++
			},
			toBeOfType(type) {
				toBeOfType_fn.call({context}, type, value)
				context.madeAssertions++
			},
			toBeInstanceOf(object) {
				toBeInstanceOf_fn.call({context}, object, value)
				context.madeAssertions++
			},
			not: {
				toBe(expected) {
					notToBe_fn.call({context}, expected, value)
					context.madeAssertions++
				},
				toEqual(expected) {
					notToEqual_fn.call({context}, expected, value)
					context.madeAssertions++
				},
				toHaveProperty(propName, propValue = undefined) {
					notToHaveProperty_fn.call({context}, value, propName, propValue)
					context.madeAssertions++
				},
				toHaveSubString(substring) {
					notToHaveSubString_fn.call({context}, value, substring)
					context.madeAssertions++
				},
				toBeOfType(type) {
					notToBeOfType_fn.call({context}, type, value)
					context.madeAssertions++
				},
				toBeInstanceOf(object) {
					notToBeInstanceOf_fn.call({context}, object, value)
					context.madeAssertions++
				}
			}
		}
	}

	expect.assertions = function(numAssertions) {
		if (context.expectedAssertions !== null) {
			return context.throw_ValidationError(
				`You can call expect.assertions() only once per context.`
			)
		}

		context.expectedAssertions = numAssertions
	}

	return {
		get madeAssertions() {
			return context.madeAssertions
		},
		set onerror(fn) {
			context.onErrorHandler = fn
		},
		expect,
		end() {
			if (context.expectedAssertions !== null) {
				const {expectedAssertions, madeAssertions} = context

				if (expectedAssertions !== madeAssertions) {
					throwError(
						`Expected ${expectedAssertions} assertion(s) but ${madeAssertions} assertion(s) were made.`
					)
				}
			}

			if (context.errors.length) {
				let message = `The following error(s) ocurred:\n`

				for (const error of context.errors) {
					message += `    • ${error}\n`
				}

				throwError(
					message
				)
			}
		}
	}
}
