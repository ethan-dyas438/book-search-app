export default class BookListing {
	constructor(url, { buyNewPrice, buyUsedPrice, rentNewPrice, rentUsedPrice }) {
		this.url = url;

		this.buyNewPrice = buyNewPrice ? buyNewPrice : null;
		this.buyUsedPrice = buyUsedPrice ? buyUsedPrice : null;
		this.rentNewPrice = rentNewPrice ? rentNewPrice : null;
		this.rentUsedPrice = rentUsedPrice ? rentUsedPrice : null;
	}
	get json() {
		return {
			url: this.url,
			buyNewPrice: this.buyNewPrice, 
			buyUsedPrice: this.buyUsedPrice, 
			rentNewPrice: this.rentNewPrice, 
			rentUsedPrice: this.rentUsedPrice
		};
	}
}