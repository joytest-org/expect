import apply from "./apply.mjs"
import _notToBe from "../../src/not_toBe.mjs"
const notToBe = apply(_notToBe)

test("should work as expected", () => {
	notToBe(true, false)
	notToBe(1, 2)

	expect(() => {
		notToBe(true, true)
	}).toThrowError("ExpectationNotMet: Expected 'true' not to be 'true'.")

	expect(() => {
		notToBe(1, 1)
	}).toThrowError("ExpectationNotMet: Expected '1' not to be '1'.")
})
