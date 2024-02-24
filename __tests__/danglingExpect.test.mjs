import {createExpectationsContext} from "../src/index.mjs"

describe("dangling expect() calls", () => {
	test(`should throw if expect(value) is left unused`, () => {
		const context = createExpectationsContext()

		let fn = context.expect(null)

		expect(() => {
			context.end()
		}).toThrowError(`<@anio-js-foundation/expect> By calling expect(value) you are promising to call one of its assertion methods: toBe, toEqual etc..
The library has detected that you either forgot to call one of the assertions methods, i.e. you did expect(value) without calling .toBe etc., or you called an assertion method more than once.
Additional information: promised assertions: 1, attempted assertions: 0.`)
	})

	test(`should throw if expect(value).not is left unused`, () => {
		const context = createExpectationsContext()

		let fn = context.expect(null).not

		expect(() => {
			context.end()
		}).toThrowError(`<@anio-js-foundation/expect> By calling expect(value) you are promising to call one of its assertion methods: toBe, toEqual etc..
The library has detected that you either forgot to call one of the assertions methods, i.e. you did expect(value) without calling .toBe etc., or you called an assertion method more than once.
Additional information: promised assertions: 1, attempted assertions: 0.`)
	})
})
