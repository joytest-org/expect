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
		ended: false,
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

	const checkContextEnded = (api) => {
		if (context.ended) {
			throw new Error(`Cannot call ${api} after context was ended. This is a bug in your code.`)
		}
	}

	const expect = function(value) {
		checkContextEnded("expect()")

		return {
			toBe(expected) {
				checkContextEnded("expect(value).toBe")

				toBe_fn.call({context}, expected, value)
				context.madeAssertions++
			},
			toEqual(expected) {
				checkContextEnded("expect(value).toEqual")

				toEqual_fn.call({context}, expected, value)
				context.madeAssertions++
			},
			toHaveProperty(propName, propValue = undefined) {
				checkContextEnded("expect(value).toHaveProperty")

				toHaveProperty_fn.call({context}, value, propName, propValue)
				context.madeAssertions++
			},
			toHaveSubString(substring) {
				checkContextEnded("expect(value).toHaveSubString")

				toHaveSubString_fn.call({context}, value, substring)
				context.madeAssertions++
			},
			toThrowError(expectedErrorMessage) {
				checkContextEnded("expect(value).toThrowError")

				toThrowError_fn.call({context}, value, expectedErrorMessage)
				context.madeAssertions++
			},
			toBeOfType(type) {
				checkContextEnded("expect(value).toBeOfType")

				toBeOfType_fn.call({context}, type, value)
				context.madeAssertions++
			},
			toBeInstanceOf(object) {
				checkContextEnded("expect(value).toBeInstanceOf")

				toBeInstanceOf_fn.call({context}, object, value)
				context.madeAssertions++
			},
			not: {
				toBe(expected) {
					checkContextEnded("expect(value).not.toBe")

					notToBe_fn.call({context}, expected, value)
					context.madeAssertions++
				},
				toEqual(expected) {
					checkContextEnded("expect(value).not.toEqual")

					notToEqual_fn.call({context}, expected, value)
					context.madeAssertions++
				},
				toHaveProperty(propName, propValue = undefined) {
					checkContextEnded("expect(value).not.toHaveProperty")

					notToHaveProperty_fn.call({context}, value, propName, propValue)
					context.madeAssertions++
				},
				toHaveSubString(substring) {
					checkContextEnded("expect(value).not.toHaveSubString")

					notToHaveSubString_fn.call({context}, value, substring)
					context.madeAssertions++
				},
				toBeOfType(type) {
					checkContextEnded("expect(value).not.toBeOfType")

					notToBeOfType_fn.call({context}, type, value)
					context.madeAssertions++
				},
				toBeInstanceOf(object) {
					checkContextEnded("expect(value).not.toBeInstanceOf")

					notToBeInstanceOf_fn.call({context}, object, value)
					context.madeAssertions++
				},
				/*
				 * toThrowError() is not implemented because the opposite of
				 * not throwing is simply calling the function.
				 */
			}
		}
	}

	expect.assertions = function(numAssertions) {
		checkContextEnded("expect.assertions")

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
			if (context.ended) {
				throw new Error(`Cannot end expectations context twice.`)
			}

			context.ended = true

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
