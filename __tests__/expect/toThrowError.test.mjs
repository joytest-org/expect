import apply from "./apply.mjs"
import _toThrowError from "../../src/toThrowError.mjs"
const toThrowError = apply(_toThrowError)

test("should not throw if function throws", () => {
	toThrowError(() => {
		throw new Error("Oops!")
	})
	toThrowError(() => {
		throw new Error("test: abc")
	}, "abc")
})

test("should throw if function does not throw", () => {
	expect(() => {
		toThrowError(() => {

		})
	}).toThrowError("ExpectationNotMet: Function expected to throw, but it did not.")
})

test("should throw if error substring does not match", () => {
	expect(() => {
		toThrowError(() => {
			throw new Error("test: abc")
		}, "abcd")
	}).toThrowError("ExpectationNotMet: Expected error message to include substring 'abcd'.")
})

test("should throw ValidationError if value is not callable", () => {
	expect(() => {
		toThrowError(false)
	}).toThrowError("ValidationError: Value is not callable.")
})

test("should throw ValidationError if expected error message is not a string", () => {
	expect(() => {
		toThrowError(() => {}, false)
	}).toThrowError("ValidationError: Expected error message must be a string.")
})
