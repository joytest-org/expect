import apply from "./apply.mjs"
import _notToEqual from "../../src/not_toEqual.mjs"
const notToEqual = apply(_notToEqual)

test("should work as expected", () => {
	notToEqual([1, 2], [0, 1])
	notToEqual("a", "b")
	notToEqual({a:1}, {})

	expect(() => {
		notToEqual({}, {})
	}).toThrowError("ExpectationNotMet: Expected values not to be equal.")

	expect(() => {
		notToEqual([1, 2], [1, 2])
	}).toThrowError("ExpectationNotMet: Expected values not to be equal.")

	notToEqual("test", new String("abc"))
})
