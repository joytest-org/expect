import {createExpectationsContext} from "../index.mjs"

test("bug 0", () => {
	const context = createExpectationsContext()
	context.expect({}).not.toHaveProperty("test")
	context.end()
})
