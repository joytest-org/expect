import apply from "./apply.mjs"
import _notToHaveProperty from "../../src/not_toHaveProperty.mjs"
const notToHaveProperty = apply(_notToHaveProperty)

test("should work as expected", () => {
	notToHaveProperty({}, "a")

	expect(() => {
		notToHaveProperty({a:1}, "a")
	}).toThrowError("ExpectationNotMet: Expected object not to have property 'a'.")

	notToHaveProperty(false, "a")
})

test("should throw ValidationError if prop value is specified", () => {
	expect(() => {
		notToHaveProperty({}, "test", 1234)
	}).toThrowError("ValidationError: Prop value is not supported by toHaveProperty().")
})
