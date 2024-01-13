import {createExpectationsContext} from "../index.mjs"

describe("createExpectationsContext", () => {
	test("should return an object with expect, end and onerror properties", () => {
		const context = createExpectationsContext()

		expect(context).toHaveProperty("expect")
		expect(context).toHaveProperty("end")
		expect(context).toHaveProperty("onerror")
	})
})
