import puppeteer from 'puppeteer';
import BookListing from './book_listing.js';
import { findFirstInNodeList } from './helpers/document_utils.js';

export default async function scrapListing(isbn) {
	const browser = await puppeteer.launch({
		headless: false,
		args: ['--start-fullscreen']
	});

	const page = await browser.newPage();
	await page.setViewport({ width: 1320, height: 920});

	await page.goto(`https://www.amazon.com/s?k=${isbn}	&i=stripbooks`);
	const results = await page.$$('.s-result-list');
	const firstResult = await findFirstInNodeList(results);
	const asin = await firstResult.$eval('div div', element => element.getAttribute('data-asin'));
	
	const title = await page.$eval('.s-result-list .a-size-medium', element => element.textContent);

	const url = await firstResult.$eval('.a-link-normal .a-text-normal', element => element.parentElement.href);

	console.log(`The asin is ${asin} and title is ${title}.`);
	
	console.log(`Url is: ${url}`);
	await page.goto(url);

	const priceOptionsBoxId = '#mediaTab_content_landing';
	const rentPriceId = '#rentPrice';
	const buyPriceSelectors = '.a-size-medium.a-color-secondary.header-price';
	
	const priceOptionsBox = await page.$(`${priceOptionsBoxId} div`);
	const sanitizePrice = element => Number(element.textContent.trim().substring(1));

	const rentUsedPrice = await priceOptionsBox.$eval(rentPriceId, sanitizePrice);
	const buyUsedPrice = await page.$eval(priceOptionsBoxId, (priceOptions, { buyPriceSelectors, sanitizePrice}) => {
		return Number(priceOptions.querySelectorAll(buyPriceSelectors)[0].textContent.trim().substring(1));
	}, { buyPriceSelectors, sanitizePrice });
	const buyNewPrice = await page.$eval(priceOptionsBoxId, (priceOptions, { buyPriceSelectors }) => {
		return Number(priceOptions.querySelectorAll(buyPriceSelectors)[1].textContent.trim().substring(1));
	}, { buyPriceSelectors });

	console.log(`Rent Used Price: ${rentUsedPrice}, Used Price: ${buyUsedPrice}, New Price: ${buyNewPrice}.`);
	const bookListing = new BookListing(url, {
		buyNewPrice,
		buyUsedPrice,
		rentUsedPrice
	});
	console.log(bookListing.json);

	await setTimeout(() => {}, 4000);

	browser.close();
	return bookListing.json;
};