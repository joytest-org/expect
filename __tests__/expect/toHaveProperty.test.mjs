import apply from "./apply.mjs"
import _toHaveProperty from "../../src/toHaveProperty.mjs"
const toHaveProperty = apply(_toHaveProperty)

test("should not throw if property exists and is enumerable", () => {
	toHaveProperty({a: 1}, "a")
})

test("should not throw if property exists and is not enumerable", () => {
	let obj = {}

	Object.defineProperty(obj, "test", {value: 1, enumerable: false})

	toHaveProperty(obj, "test")
})

test("should work with primitives", () => {
	toHaveProperty("test", "length")
	toHaveProperty([1,2], "length")
})

test("should throw if property does not exist", () => {
	expect(() => {
		toHaveProperty({a: 1}, "test")
	}).toThrowError("ExpectationNotMet: Expected object to have property 'test'.")
})

test("should throw ValidationError if prop value is specified", () => {
	expect(() => {
		toHaveProperty({}, "test", 1234)
	}).toThrowError("ValidationError: Prop value is not supported by toHaveProperty().")
})
