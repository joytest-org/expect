import apply from "./apply.mjs"
import _toEqual from "../../src/toEqual.mjs"
const toEqual = apply(_toEqual)

test("should not throw given two values considered to be equal", () => {
	toEqual(true, true)
	toEqual({}, {})
	toEqual([], [])
	toEqual({
		a: [1, 2, 3]
	}, {
		a: [1, 2, 3]
	})
	toEqual([1,2], [1,2])
	toEqual(3, new Number(3))
	toEqual(true, new Boolean(true))
	toEqual("test", new String("test"))
})

test("should throw given two unequal values", () => {
	expect(() => {
		toEqual(true, false)
	}).toThrowError("ExpectationNotMet: ")
	expect(() => {
		toEqual({}, false)
	}).toThrowError("ExpectationNotMet: ")
	expect(() => {
		toEqual([1], [1,2])
	}).toThrowError("ExpectationNotMet: ")
	expect(() => {
		toEqual({a:1}, {a:1,b: 2})
	}).toThrowError("ExpectationNotMet: ")
	expect(() => {
		toEqual(3, new Number(2))
	}).toThrowError("ExpectationNotMet: ")
	expect(() => {
		toEqual(true, new Boolean(false))
	}).toThrowError("ExpectationNotMet: ")
	expect(() => {
		toEqual("test", new String("abc"))
	}).toThrowError("ExpectationNotMet: ")
	expect(() => {
		const a = {
			a: {
				b: {
					c: [1, 2]
				}
			}
		}
		const b = {
			a: {
				b: {
					c: [0, 1]
				}
			}
		}

		toEqual(a, b)
	})
})
