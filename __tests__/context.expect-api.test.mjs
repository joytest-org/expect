import {createExpectationsContext} from "../index.mjs"

describe("context.expect", () => {
	test("should have .assertions function", () => {
		const context = createExpectationsContext()
		expect(context.expect).toHaveProperty("assertions")
	})
})

describe("context.expect()", () => {
	test("should have .toBe function", () => {
		const context = createExpectationsContext()
		expect(context.expect()).toHaveProperty("toBe")
	})
	test("should have .toEqual function", () => {
		const context = createExpectationsContext()
		expect(context.expect()).toHaveProperty("toEqual")
	})
	test("should have .toHaveProperty function", () => {
		const context = createExpectationsContext()
		expect(context.expect()).toHaveProperty("toHaveProperty")
	})
	test("should have .toThrowError function", () => {
		const context = createExpectationsContext()
		expect(context.expect()).toHaveProperty("toThrowError")
	})
	test("should have .toHaveSubString function", () => {
		const context = createExpectationsContext()
		expect(context.expect()).toHaveProperty("toHaveSubString")
	})
	test("should have .toBeOfType function", () => {
		const context = createExpectationsContext()
		expect(context.expect()).toHaveProperty("toBeOfType")
	})
	test("should have .toBeInstanceOf function", () => {
		const context = createExpectationsContext()
		expect(context.expect()).toHaveProperty("toBeInstanceOf")
	})
	test("should have .not property", () => {
		const context = createExpectationsContext()
		expect(context.expect()).toHaveProperty("not")
	})
})

describe("context.expect().not", () => {
	test("should have .toBe function", () => {
		const context = createExpectationsContext()
		expect(context.expect().not).toHaveProperty("toBe")
	})
	test("should have .toEqual function", () => {
		const context = createExpectationsContext()
		expect(context.expect().not).toHaveProperty("toEqual")
	})
	test("should have .toHaveProperty function", () => {
		const context = createExpectationsContext()
		expect(context.expect().not).toHaveProperty("toHaveProperty")
	})
	test("should have .toHaveSubString function", () => {
		const context = createExpectationsContext()
		expect(context.expect().not).toHaveProperty("toHaveSubString")
	})
	test("should have .toBeOfType function", () => {
		const context = createExpectationsContext()
		expect(context.expect().not).toHaveProperty("toBeOfType")
	})
	test("should have .toBeInstanceOf function", () => {
		const context = createExpectationsContext()
		expect(context.expect().not).toHaveProperty("toBeInstanceOf")
	})
	test("should not have .not property", () => {
		const context = createExpectationsContext()
		expect(context.expect().not).not.toHaveProperty("not")
	})
})
