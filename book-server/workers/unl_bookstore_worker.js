import puppeteer from 'puppeteer';

const isbnNumber = '9780262033848';

(async (isbn) => {
	const browser = await puppeteer.launch({
		headless: false,
		args: ['--start-fullscreen']
	});

	const page = await browser.newPage();
	await page.setViewport({ width: 1320, height: 920});

    await page.goto(`https://www.bkstr.com/nebraska-lincolnstore/home`);
    const searchbar = await page.$('#search_1000180941');
    await searchbar.type(isbn);
    await searchbar.press('Enter');
    const prices = await page.$$('.purchase-option-item-price');
    // const rentUsed = await page.$$('.purchase-option-item-price')[0].textContent;
    // console.log(rentUsed);
    const rentNew = await prices[1].textContent;
    const buyUsed = await prices[2].textContent;
    const buyNew = await prices[3].textContent;
    const result = {
        rentUsed,
        rentNew,
        buyUsed,
        buyNew
    };
    console.log(result);
	/*
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
	const buyNewPrice = await priceOptionsBox*/

	await setTimeout(() => {}, 4000);

	// browser.close();
})(isbnNumber);