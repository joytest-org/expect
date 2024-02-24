import toBe_fn from "./toBe.mjs"
import toEqual_fn from "./toEqual.mjs"
import toHaveProperty_fn from "./toHaveProperty.mjs"
import toHaveSubString_fn from "./toHaveSubString.mjs"
import toThrowError_fn from "./toThrowError.mjs"
import toBeOfType_fn from "./toBeOfType.mjs"
import toBeInstanceOf_fn from "./toBeInstanceOf.mjs"

import notToBe_fn from "./not_toBe.mjs"
import notToEqual_fn from "./not_toEqual.mjs"
import notToHaveProperty_fn from "./not_toHaveProperty.mjs"
import notToHaveSubString_fn from "./not_toHaveSubString.mjs"
import notToBeOfType_fn from "./not_toBeOfType.mjs"
import notToBeInstanceOf_fn from "./not_toBeInstanceOf.mjs"

function throwError(msg) {
	throw new Error(`<@anio-js-foundation/expect> ${msg}`)
}

export function createExpectationsContext() {
	let context = {
		ended: false,
		errors: [],
		expectedAssertions: null,
		ignoreExpectationNotMetErrors: false,
		promisedAssertions: 0,
		assertionAttempts: 0,
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
		++context.promisedAssertions

		checkContextEnded("expect()")

		return {
			toBe(expected) {
				checkContextEnded("expect(value).toBe")
				context.assertionAttempts++

				toBe_fn.call({context}, expected, value)
				context.madeAssertions++
			},
			toEqual(expected) {
				checkContextEnded("expect(value).toEqual")
				context.assertionAttempts++

				toEqual_fn.call({context}, expected, value)
				context.madeAssertions++
			},
			toHaveProperty(propName, propValue = undefined) {
				checkContextEnded("expect(value).toHaveProperty")
				context.assertionAttempts++

				toHaveProperty_fn.call({context}, value, propName, propValue)
				context.madeAssertions++
			},
			toHaveSubString(substring) {
				checkContextEnded("expect(value).toHaveSubString")
				context.assertionAttempts++

				toHaveSubString_fn.call({context}, value, substring)
				context.madeAssertions++
			},
			toThrowError(expectedErrorMessage) {
				checkContextEnded("expect(value).toThrowError")
				context.assertionAttempts++

				toThrowError_fn.call({context}, value, expectedErrorMessage)
				context.madeAssertions++
			},
			toBeOfType(type) {
				checkContextEnded("expect(value).toBeOfType")
				context.assertionAttempts++

				toBeOfType_fn.call({context}, type, value)
				context.madeAssertions++
			},
			toBeInstanceOf(object) {
				checkContextEnded("expect(value).toBeInstanceOf")
				context.assertionAttempts++

				toBeInstanceOf_fn.call({context}, object, value)
				context.madeAssertions++
			},
			not: {
				toBe(expected) {
					checkContextEnded("expect(value).not.toBe")
					context.assertionAttempts++

					notToBe_fn.call({context}, expected, value)
					context.madeAssertions++
				},
				toEqual(expected) {
					checkContextEnded("expect(value).not.toEqual")
					context.assertionAttempts++

					notToEqual_fn.call({context}, expected, value)
					context.madeAssertions++
				},
				toHaveProperty(propName, propValue = undefined) {
					checkContextEnded("expect(value).not.toHaveProperty")
					context.assertionAttempts++

					notToHaveProperty_fn.call({context}, value, propName, propValue)
					context.madeAssertions++
				},
				toHaveSubString(substring) {
					checkContextEnded("expect(value).not.toHaveSubString")
					context.assertionAttempts++

					notToHaveSubString_fn.call({context}, value, substring)
					context.madeAssertions++
				},
				toBeOfType(type) {
					checkContextEnded("expect(value).not.toBeOfType")
					context.assertionAttempts++

					notToBeOfType_fn.call({context}, type, value)
					context.madeAssertions++
				},
				toBeInstanceOf(object) {
					checkContextEnded("expect(value).not.toBeInstanceOf")
					context.assertionAttempts++

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

			//
			// whenever someone calls expect()
			// they are promising to call one of the
			// comparisons: toBe, toEqual etc.
			//
			// It is not valid to save the resulting object
			// of expect() to call a comparison function twice.
			//
			if (
				context.promisedAssertions !==
				context.assertionAttempts
			) {
				throwError(
					`By calling expect(value) you are promising to call one of its assertion methods: toBe, toEqual etc..\n` +
					`The library has detected that you either forgot to call one of the assertions methods, i.e. you did expect(value)` +
					` without calling .toBe etc., or you called an assertion method more than once.\n` +
					`Additional information: promised assertions: ${context.promisedAssertions}, attempted assertions: ${context.assertionAttempts}.`
				)
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
