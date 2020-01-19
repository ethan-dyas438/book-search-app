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
	const url = await page.$eval('.s-result-list', results => {
		for (const element of results.children) {
			const result = element.querySelector('div > div > span > div > div');
			if (result.getAttribute('data-component-type') !== 'sp-sponsored-result') {
				return result.querySelector('.a-link-normal .a-text-normal').parentElement.href;
			}
		}
		return null;
	});
	
	await page.goto(url);

	const priceOptionsBoxId = '#mediaTab_content_landing';
	const rentPriceId = '#rentPrice';
	const buyPriceSelectors = '.a-size-medium.a-color-secondary.header-price';
	
	const productTitleId = '#productTitle';
	const contributorNameClass = '.a-link-normal.contributorNameID';

	const priceOptionsBox = await page.$(`${priceOptionsBoxId} div`);
	const sanitizePrice = element => Number(element.textContent.trim().substring(1));

	const rentUsedPrice = await priceOptionsBox.$eval(rentPriceId, sanitizePrice);
	const buyUsedPrice = await page.$eval(priceOptionsBoxId, (priceOptions, { buyPriceSelectors, sanitizePrice}) => {
		return Number(priceOptions.querySelectorAll(buyPriceSelectors)[0].textContent.trim().substring(1));
	}, { buyPriceSelectors, sanitizePrice });
	const buyNewPrice = await page.$eval(priceOptionsBoxId, (priceOptions, { buyPriceSelectors }) => {
		return Number(priceOptions.querySelectorAll(buyPriceSelectors)[1].textContent.trim().substring(1));
	}, { buyPriceSelectors });

	const title = await page.$eval(productTitleId, element => element.textContent);
	const author = await page.$eval(contributorNameClass, element => element.textContent);

	console.log(`Rent Used Price: ${rentUsedPrice}, Used Price: ${buyUsedPrice}, New Price: ${buyNewPrice}.`);
	const bookListing = new BookListing(url, title, author, {
		buyNewPrice,
		buyUsedPrice,
		rentUsedPrice
	});
	console.log(bookListing.json);

	await setTimeout(() => {}, 4000);

	browser.close();
	return bookListing.json;
};