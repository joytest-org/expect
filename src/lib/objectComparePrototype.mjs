export default function(l, r) {
	return Object.is(
		Object.getPrototypeOf(l),
		Object.getPrototypeOf(r)
	)
}
