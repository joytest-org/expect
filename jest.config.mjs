// source https://stackoverflow.com/questions/68956636/how-to-use-esm-tests-with-jest
// https://stackoverflow.com/a/70242114/2005038

export default {
	moduleFileExtensions: [
		"mjs",
		// must include "js" to pass validation https://github.com/facebook/jest/issues/12116
		"js"
	],

	testRegex: `test\.mjs$`
}
