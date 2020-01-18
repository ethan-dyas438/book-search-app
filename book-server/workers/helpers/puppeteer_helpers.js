export async function getAttribute(page, attribute) {
	const [elementHandle] = await page.$x(`.//a/@${attribute}`);
	console.log(elementHandle);
	const propertyHandle = await elementHandle.getProperty('value');
	return await propertyHandle.jsonValue(); 
}