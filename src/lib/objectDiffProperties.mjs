import objectGetProperties from "./objectGetProperties.mjs"

export default function(target, value) {
	let ret = []
	const targetKeys = objectGetProperties(target)
	const valueKeys = objectGetProperties(value)

	// Missing keys
	for (const key of targetKeys) {
		if (!valueKeys.includes(key)) {
			ret.push(`-${key}`)
		}
	}

	// Additional keys
	for (const key of valueKeys) {
		if (!targetKeys.includes(key)) {
			ret.push(`+${key}`)
		}
	}

	return ret
}
