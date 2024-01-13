import apply from "./apply.mjs"
import _toBeOfType from "../../src/toBeOfType.mjs"
const toBeOfType = apply(_toBeOfType)

test("should given the expected type", () => {
	toBeOfType("string", "")
	toBeOfType("string", new String(""))
	toBeOfType("number", 1)
	toBeOfType("number", new Number(1))
	toBeOfType("boolean", true)
	toBeOfType("boolean", new Boolean(true))
	toBeOfType("object", {})
})

test("should throw when value is not of expected type", () => {
	expect(() => {
		toBeOfType("number", true)
	}).toThrowError("ExpectationNotMet: Expected type 'number' but got 'boolean'.")
})
