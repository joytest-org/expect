export default function(fn) {
	return fn.bind({
		context: {
			throw_ExpectationNotMetError(message) {
				throw new Error(
					`<@joytest/expect> ExpectationNotMet: ${message}`
				)
			},
			throw_ValidationError(message) {
				throw new Error(
					`<@joytest/expect> ValidationError: ${message}`
				)
			}
		}
	})
}
