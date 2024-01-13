# @anio-js-foundation/expect

Small assertion module.

|Function|Description|Since|
|:---|:---|:---|
|💥 expect(`a`).toBe(`b`)|Asserts that `a` and `b` are the same (`===`).<br><br>💥 Throws if assertion failed.|v1.0.0|
|💥 expect(`a`).toBeInstanceOf(`b`)|Asserts that `a` is an instance of `b`.<br><br>💥 Throws if assertion failed.|v1.0.0|
|💥 expect(`a`).toEqual(`b`)|If `b` is a primitive then:<br><br>`a === b`<br><br>If `b` is not a primitive:<br><br>• Asserts same prototype<br>• Asserts same properties<br>• Asserts property value recursively with `toEqual`.<br><br>💥 Throws if assertion failed.|v1.0.0|
|💥 expect(`a`).toHaveProperty(`b`)|Asserts that object `a` has an enumerable/non-enumerable property called `b`.<br><br>💥 Throws if assertion failed.|v1.0.0|
|💥 expect(`a`).toHaveSubString(`b`)|Asserts that string `a` contains the sub-string `b`.<br><br>💥 Throws if assertion failed.|v1.0.0|
|💥 expect(`fn`).toThrowError()|Asserts that `fn` throws an error.<br><br>💥 Throws if assertion failed.|v1.0.0|
|💥 expect(`fn`).toThrowError(`message`)|Asserts that `fn` throws an error with a message containing `message`.<br><br>💥 Throws if assertion failed.|v1.0.0|
|💥 expect.assertions(`num`)|Sets how many `expect()` function calls are expected.<br><br>💥 Throws if `expect.assertions` is already set.|v1.0.0|

All assertions (except `toThrowError`) can be negated with `.not`:

```javascript
expect(1).not.toBe(2)
```

Example usage:

```javascript
import {createExpectationsContext} from "@anio-js-foundation/expect"
const {expect, end} = createExpectationsContext()

expect(1).toBe(1)
end()
```
