import apply from "./apply.mjs"
import _notToBeOfType from "../../src/not_toBeOfType.mjs"
const notToBeOfType = apply(_notToBeOfType)

test("should work as expected", () => {
	notToBeOfType("string", 1)
	notToBeOfType("number", {})

	expect(() => {
		notToBeOfType("string", "")
	}).toThrowError("ExpectationNotMet: Expected value not to be of type 'string'.")

	expect(() => {
		notToBeOfType("number", 1)
	}).toThrowError("ExpectationNotMet: Expected value not to be of type 'number'.")
})
