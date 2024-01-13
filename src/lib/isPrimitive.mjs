export default function(value) {
	if (       value === null)      return true
	if (typeof value === "boolean") return true
	if (typeof value === "number")  return true
	if (typeof value === "bigint")  return true
	if (typeof value === "string")  return true
	if (typeof value === "symbol")  return true

	return false
}
