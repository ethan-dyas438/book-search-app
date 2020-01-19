import express from 'express';
import requestFromAmazon from './workers/amazon_worker.js';
const app = express();

app.get('/listing/:service/:isbn', async (request, response) => {
	const isbn = request.params.isbn.trim();
	const service = request.params.service.trim().toLowerCase();
	switch (service) {
		case 'amazon':
			response.send(await requestFromAmazon(isbn));
			break;
		case 'unlbkstr':
			response.send(await requestFromUnlBkstr(isbn));
			break;
		case 'chegg':
			response.send(await requestFromChegg(isbn));
			break;
		default:
			console.log(`Service: ${service} is not a valid service.`)
			response.sendStatus(400);
			break;
	}
});

app.listen(8081, () => {
	console.log('The server is now online.');
});