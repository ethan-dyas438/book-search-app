import puppeteer from 'puppeteer';

const isbnNumber = '0131103709';

(async (isbn) => {
	const browser = await puppeteer.launch({
		headless: false,
		args: ['--start-fullscreen']
	});

	const page = await browser.newPage();
	await page.setViewport({ width: 1320, height: 920});

	await page.goto(`https://www.amazon.com/s?k=${isbn}	&i=stripbooks`);
	const results = await page.$$('.s-result-list');
	const firstResult = await results[0];
	const asin = await firstResult.$eval('div div', element => element.getAttribute('data-asin'));
	
	const title = await page.$eval('.s-result-list.a-size-medium', element => element.textContent);

	const url = await firstResult.$eval('.a-link-normal.a-text-normal', element => element.parentElement.href);

	console.log(`The asin is ${asin} and title is ${title}.`);
	console.log(`Url is: ${url}`);
	await page.goto(url);

	const priceOptionsBoxId = '#mediaTab_content_landing';
	const rentPriceId = '#rentPrice';
	const buyPriceSelectors = '.a-size-medium.a-color-secondary.header-price';
	
	const priceOptionsBox = await page.$(`${priceOptionsBoxId} div`);
	
	const sanitizePrice = element => Number(element.textContent.trim().substring(1));

	const rentPrice = await priceOptionsBox.$eval(rentPriceId, sanitizePrice);
	const buyUsedPrice = await page.$eval(priceOptionsBoxId, (priceOptions, { buyPriceSelectors, sanitizePrice}) => {
		return priceOptions.querySelectorAll(buyPriceSelectors)[0].textContent.trim();
		// return sanitizePrice(priceOptions.querySelectorAll(buyUsedSelector)[0]);
	}, { buyPriceSelectors, sanitizePrice });
	const buyNewPrice = await page.$eval(priceOptionsBoxId, (priceOptions, { buyPriceSelectors, sanitizePrice }) => {
		return priceOptions.querySelectorAll(buyPriceSelectors)[1].textContent.trim();
		// return sanitizePrice(priceOptions.querySelectorAll(buyUsedSelector)[1]);
	}, { buyPriceSelectors, sanitizePrice });

	console.log(`Rent Price: ${rentPrice}, Used Price: ${buyUsedPrice}, New Price: ${buyNewPrice}.`);

	await setTimeout(() => {}, 4000);

	browser.close();
})(isbnNumber);