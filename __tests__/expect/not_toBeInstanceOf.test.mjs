import apply from "./apply.mjs"
import _notToBeInstanceOf from "../../src/not_toBeInstanceOf.mjs"
const notToBeInstanceOf = apply(_notToBeInstanceOf)

test("should work as expected", () => {
	notToBeInstanceOf(String, new Array)
	notToBeInstanceOf(Number, new Boolean)

	expect(() => {
		notToBeInstanceOf(String, new String)
	}).toThrowError("ExpectationNotMet: Expected value not to be instance of 'String'.")

	expect(() => {
		notToBeInstanceOf(Number, new Number)
	}).toThrowError("ExpectationNotMet: Expected value not to be instance of 'Number'.")
})
