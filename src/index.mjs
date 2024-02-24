import createRandomIdentifier from "@anio-js-core-foundation/create-random-identifier"

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
		promisedAssertions: new Map(),
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
		//
		// in order to detect "dangling" expect() calls
		// create an entry for this particular
		// expect() invocation and clear it once it
		// has been used in at least one comparsion.
		// multiple comparsions are allowed and therefore
		// ignored.
		//
		let promise_id = createRandomIdentifier(16)

		//
		// flag that particular invocation as not
		// been handled (yet), invocations to
		// .toEqual, .toBe etc. will clear that
		// flag
		//
		context.promisedAssertions.set(promise_id, true)

		const clearPromiseAssertion = () => {
			context.promisedAssertions.delete(promise_id)
		}

		checkContextEnded("expect()")

		return {
			toBe(expected) {
				checkContextEnded("expect(value).toBe")
				clearPromiseAssertion()

				toBe_fn.call({context}, expected, value)
				context.madeAssertions++
			},
			toEqual(expected) {
				checkContextEnded("expect(value).toEqual")
				clearPromiseAssertion()

				toEqual_fn.call({context}, expected, value)
				context.madeAssertions++
			},
			toHaveProperty(propName, propValue = undefined) {
				checkContextEnded("expect(value).toHaveProperty")
				clearPromiseAssertion()

				toHaveProperty_fn.call({context}, value, propName, propValue)
				context.madeAssertions++
			},
			toHaveSubString(substring) {
				checkContextEnded("expect(value).toHaveSubString")
				clearPromiseAssertion()

				toHaveSubString_fn.call({context}, value, substring)
				context.madeAssertions++
			},
			toThrowError(expectedErrorMessage) {
				checkContextEnded("expect(value).toThrowError")
				clearPromiseAssertion()

				toThrowError_fn.call({context}, value, expectedErrorMessage)
				context.madeAssertions++
			},
			toBeOfType(type) {
				checkContextEnded("expect(value).toBeOfType")
				clearPromiseAssertion()

				toBeOfType_fn.call({context}, type, value)
				context.madeAssertions++
			},
			toBeInstanceOf(object) {
				checkContextEnded("expect(value).toBeInstanceOf")
				clearPromiseAssertion()

				toBeInstanceOf_fn.call({context}, object, value)
				context.madeAssertions++
			},
			not: {
				toBe(expected) {
					checkContextEnded("expect(value).not.toBe")
					clearPromiseAssertion()

					notToBe_fn.call({context}, expected, value)
					context.madeAssertions++
				},
				toEqual(expected) {
					checkContextEnded("expect(value).not.toEqual")
					clearPromiseAssertion()

					notToEqual_fn.call({context}, expected, value)
					context.madeAssertions++
				},
				toHaveProperty(propName, propValue = undefined) {
					checkContextEnded("expect(value).not.toHaveProperty")
					clearPromiseAssertion()

					notToHaveProperty_fn.call({context}, value, propName, propValue)
					context.madeAssertions++
				},
				toHaveSubString(substring) {
					checkContextEnded("expect(value).not.toHaveSubString")
					clearPromiseAssertion()

					notToHaveSubString_fn.call({context}, value, substring)
					context.madeAssertions++
				},
				toBeOfType(type) {
					checkContextEnded("expect(value).not.toBeOfType")
					clearPromiseAssertion()

					notToBeOfType_fn.call({context}, type, value)
					context.madeAssertions++
				},
				toBeInstanceOf(object) {
					checkContextEnded("expect(value).not.toBeInstanceOf")
					clearPromiseAssertion()

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
			if (context.promisedAssertions.size) {
				throwError(
					`You have dangling or unused expect() objects. This is not allowed.` +
					` Number of dangling calls detected: ${context.promisedAssertions.size}.`
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
