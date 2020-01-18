import puppeteer from 'puppeteer';
import { getAttribute } from './helpers/puppeteer_helpers.js';

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
	
	const title = await page.$eval('.s-result-list .a-size-medium', element => element.textContent);

	const url = await firstResult.$eval('.a-link-normal .a-text-normal', element => element.parentElement.href);

	console.log(`The asin is ${asin} and title is ${title}.`);
	console.log(`Url is: ${url}`);
	await page.goto(url);

	const priceOptionsBoxId = '#mediaTab_content_landing';
	const rentPriceId = '#rentPrice';
	const buyUsedSelector = '.a-size-medium.a-color-secondary.header-price';
	
	const priceOptionsBox = await page.$(`${priceOptionsBoxId} div`);
	
	const sanitizePrice = element => Number(element.textContent.trim().substring(1));

	const rentPrice = await priceOptionsBox.$eval(rentPriceId, sanitizePrice);
	const buyUsedPrice = sanitizePrice(await priceOptionsBox.$$(buyUsedSelector)[1]);
	const buyNewPrice = await priceOptionsBox

	await setTimeout(() => {}, 4000);

	browser.close();
})(isbnNumber);