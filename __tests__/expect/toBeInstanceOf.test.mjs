import apply from "./apply.mjs"
import _toBeInstanceOf from "../../src/toBeInstanceOf.mjs"
const toBeInstanceOf = apply(_toBeInstanceOf)

test("should not throw if value is instance of", () => {
	toBeInstanceOf(String, new String())
	toBeInstanceOf(Object, {})
	toBeInstanceOf(Error, new Error())
})

test("should throw if value is not instance of", () => {
	expect(() => {
		toBeInstanceOf(String, 1)
	}).toThrowError("ExpectationNotMet: Expected value to be instance of 'String'.")
})
