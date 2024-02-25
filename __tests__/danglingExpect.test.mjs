import {createExpectationsContext} from "../src/index.mjs"

describe("dangling expect() calls", () => {
	test(`should throw if expect(value) is left unused`, () => {
		const context = createExpectationsContext()

		let fn = context.expect(null)

		expect(() => {
			context.end()
		}).toThrowError(`<@joytest/expect> You have dangling or unused expect() objects. This is not allowed. Number of dangling calls detected: 1.`)
	})

	test(`should throw if expect(value).not is left unused`, () => {
		const context = createExpectationsContext()

		let fn = context.expect(null).not

		expect(() => {
			context.end()
		}).toThrowError(`<@joytest/expect> You have dangling or unused expect() objects. This is not allowed. Number of dangling calls detected: 1.`)
	})

	test(`should not throw if expect(value) is used more than once`, () => {
		const context = createExpectationsContext()

		let fn = context.expect(1)

		fn.toBe(1)
		fn.toEqual(1)

		context.end()
	})

	test(`should not throw if expect(value).not is used more than once`, () => {
		const context = createExpectationsContext()

		let fn = context.expect(2)

		fn.not.toBe(1)
		fn.not.toEqual(1)

		context.end()
	})
})
