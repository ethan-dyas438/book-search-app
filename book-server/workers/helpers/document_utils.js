export function findFirstInNodeList(nodelist, conditionalFunction) {
	for (const element of nodelist) {
		if (conditionalFunction(element)) {
			return element;
		}
	}
	return null
}