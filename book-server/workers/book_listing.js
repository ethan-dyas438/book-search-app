export default class BookListing {
	constructor(url, title, author, { buyNewPrice, buyUsedPrice, rentNewPrice, rentUsedPrice }) {
		this.url = url;
		this.title = title;
		this.author = author;

		this.buyNewPrice = buyNewPrice ? buyNewPrice : null;
		this.buyUsedPrice = buyUsedPrice ? buyUsedPrice : null;
		this.rentNewPrice = rentNewPrice ? rentNewPrice : null;
		this.rentUsedPrice = rentUsedPrice ? rentUsedPrice : null;
	}
	get json() {
		return {
			title: this.title,
			author: this.author,
			url: this.url,
			buyNewPrice: this.buyNewPrice, 
			buyUsedPrice: this.buyUsedPrice, 
			rentNewPrice: this.rentNewPrice, 
			rentUsedPrice: this.rentUsedPrice
		};
	}
}