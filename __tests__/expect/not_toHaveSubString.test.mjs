import apply from "./apply.mjs"
import _notToHaveSubString from "../../src/not_toHaveSubString.mjs"
const notToHaveSubString = apply(_notToHaveSubString)

test("should work as expected", () => {
	notToHaveSubString("Hello, World!", "abc")
	notToHaveSubString("", "abc")

	expect(() => {
		notToHaveSubString("Hello, World!", "World!")
	}).toThrowError("ExpectationNotMet: Expected 'Hello, World!' not to have substring 'World!'.")

	expect(() => {
		notToHaveSubString("Hello, World!", "")
	}).toThrowError("ExpectationNotMet: Expected 'Hello, World!' not to have substring ''.")
})

test("should throw ValidationError if value is not a string", () => {
	expect(() => {
		notToHaveSubString(false, "World!")
	}).toThrowError("ValidationError: Value must be a string.")
})

test("should throw ValidationError if substring is not a string", () => {
	expect(() => {
		notToHaveSubString("Hello", false)
	}).toThrowError("ValidationError: Substring must be a string.")
})
