import {createExpectationsContext} from "../index.mjs"

describe("context ended", () => {
	test("should throw if .assertions() is called after expectation context is ended", () => {
		const context = createExpectationsContext()

		context.end()

		expect(() => {
			context.expect.assertions(1)
		}).toThrowError("Cannot call expect.assertions after context was ended. This is a bug in your code.")
	})

	const methods = [
		"toBe",
		"toEqual",
		"toHaveProperty",
		"toHaveSubString",
		"toThrowError",
		"toBeOfType",
		"toBeInstanceOf"
	]

	for (const method of methods) {
		test(`should throw if expect(value).${method}() called after expectation context is ended`, () => {
			const context = createExpectationsContext()

			context.end()

			expect(() => {
				console.log(context.expect(null)[method]())
			}).toThrowError(`Cannot call expect(value).${method} after context was ended. This is a bug in your code.`)
		})
	}

	for (const method of methods) {
		if (method === "toThrowError") continue

		test(`should throw if expect(value).not.${method}() called after expectation context is ended`, () => {
			const context = createExpectationsContext()

			context.end()

			expect(() => {
				console.log(context.expect(null).not[method]())
			}).toThrowError(`Cannot call expect(value).not.${method} after context was ended. This is a bug in your code.`)
		})
	}
})
