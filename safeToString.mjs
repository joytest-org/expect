export default function safeToString(value) {
	try {
		return `${value}`
	} catch (error) {
		return `<###>`
	}
}
