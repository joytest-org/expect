import apply from "./apply.mjs"
import _toBe from "../../src/toBe.mjs"
const toBe = apply(_toBe)

test("should not throw given two values considered to be equal", () => {
	toBe(true, true)
	toBe("", "")
	toBe(1, 1)
})

test("should throw given two unequal values", () => {
	expect(() => {
		toBe(true, false)
	}).toThrowError("ExpectationNotMet: Expected 'false' to be 'true'.")
	expect(() => {
		toBe("", "a")
	}).toThrowError("ExpectationNotMet: Expected 'a' to be ''.")
	expect(() => {
		toBe(1, 0)
	}).toThrowError("ExpectationNotMet: Expected '0' to be '1'.")
	expect(() => {
		toBe({}, {})
	}).toThrowError("ExpectationNotMet: ")
	expect(() => {
		toBe("test", new String("test"))
	}).toThrowError("ExpectationNotMet: ")
	expect(() => {
		toBe(new String("test"), "test")
	}).toThrowError("ExpectationNotMet: ")
})

test("should not throw given same object reference", () => {
	let a = {}

	toBe(a, a)
})
