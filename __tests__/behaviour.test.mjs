import {createExpectationsContext} from "../index.mjs"

describe("behaviour", () => {
	test("should throw if .assertions() is called more than once per context", () => {
		const context = createExpectationsContext()

		context.expect.assertions(1)

		expect(() => {
			context.expect.assertions(2)
		}).toThrowError("ValidationError: You can call expect.assertions() only once per context.")
	})

	test("should call context.onerror when assertion with context.expect() fails", () => {
		expect.assertions(2)
		const context = createExpectationsContext()

		context.onerror = function(message) {
			expect(message).toBe("ExpectationNotMet: Expected '1' to be '0'.")
		}

		expect(() => {
			context.expect(1).toBe(0)
		}).toThrowError("ExpectationNotMet: Expected '1' to be '0'.")
	})

	test("should count made assertions correctly", () => {
		const context = createExpectationsContext()

		context.expect(1).toBe(1)
		context.expect({}).toEqual({})
		context.expect({a: 1}).toHaveProperty("a")
		context.expect("Hello, World!").toHaveSubString("World!")
		context.expect(() => {
			throw new Error("Hello, World!")
		}).toThrowError("World!")
		context.expect("").toBeOfType("string")
		context.expect(new String).toBeInstanceOf(String)

		context.expect(1).not.toBe(2)
		context.expect({}).not.toEqual({a: 1})
		context.expect({}).not.toHaveProperty("a")
		context.expect("Hello, World!").not.toHaveSubString("abc")
		context.expect(1).not.toBeOfType("string")
		context.expect(new String).not.toBeInstanceOf(Array)

		expect(context.madeAssertions).toBe(13)
	})
})
