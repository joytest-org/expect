import {createExpectationsContext} from "../index.mjs"

test("bug 1", () => {
	const context = createExpectationsContext()
	context.expect(Symbol()).not.toBe(Symbol())
	context.expect(Symbol()).not.toEqual(Symbol())
	context.end()
})
