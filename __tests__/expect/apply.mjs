export default function(fn) {
	return fn.bind({
		context: {
			throw_ExpectationNotMetError(message) {
				throw new Error(
					`<@anio-js-foundation/expect> ExpectationNotMet: ${message}`
				)
			},
			throw_ValidationError(message) {
				throw new Error(
					`<@anio-js-foundation/expect> ValidationError: ${message}`
				)
			}
		}
	})
}
