import {createExpectationsContext} from "../index.mjs"

describe("context.end", () => {
	test("should work as expected", () => {
		const context = createExpectationsContext()
		context.expect.assertions(1)
		context.expect(1).toBe(1)
		context.end()
	})

	test("should throw if number of assertions have been set and mismatch", () => {
		expect(() => {
			const context = createExpectationsContext()
			context.expect.assertions(2)
			context.expect(1).toBe(1)
			context.end()
		}).toThrowError("Expected 2 assertion(s) but 1 assertion(s) were made.")
	})

	test("should throw if errors ocurred during testing", () => {
		expect.assertions(2)

		expect(() => {
			const context = createExpectationsContext()

			try {
				context.expect(1).toBe(2)
			} catch (error) {
				expect(error.message).toBe(
					"<@anio-js-foundation/expect> ExpectationNotMet: Expected '1' to be '2'."
				)
			}

			context.end()
		}).toThrowError("The following error(s) ocurred:")
	})

	test("should throw if ended twice", () => {
		const context = createExpectationsContext()

		context.end()

		expect(() => {
			context.end()
		}).toThrowError("Cannot end expectations context twice.")
	})

})

