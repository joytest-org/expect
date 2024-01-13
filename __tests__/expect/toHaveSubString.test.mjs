import apply from "./apply.mjs"
import _toHaveSubString from "../../src/toHaveSubString.mjs"
const toHaveSubString = apply(_toHaveSubString)

test("should not throw if value contains substring", () => {
	toHaveSubString("Hello, World!", "World!")
})

test("should throw if value does not contain substring", () => {
	expect(() => {
		toHaveSubString("Hello, World!", "abc")
	}).toThrowError("ExpectationNotMet: String 'Hello, World!' does not contain substring 'abc'.")
})

test("should throw ValidationError if value is not a string", () => {
	expect(() => {
		toHaveSubString(false, "World!")
	}).toThrowError("ValidationError: Value must be a string.")
})

test("should throw ValidationError if substring is not a string", () => {
	expect(() => {
		toHaveSubString("Hello", false)
	}).toThrowError("ValidationError: Substring must be a string.")
})
