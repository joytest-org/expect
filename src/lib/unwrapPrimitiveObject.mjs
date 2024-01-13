export default function(object) {
	if (object instanceof Number) {
		return object.valueOf()
	} else if (object instanceof String) {
		return object.valueOf()
	} else if (object instanceof Boolean) {
		return object.valueOf()
	} else if (object instanceof BigInt) {
		return object.valueOf()
	}

	return object
}
