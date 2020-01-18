import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  book: string = "";
  priceResults = [
    {
      seller: '../../assets/amazon-logo-rgp.webp',
      rent_price: "26",
      buy_used_price: "50",
      buy_new_price: "100"
    }
  ];

  constructor() {}

  searchBook() {
    // resutls = await call;
  }

}
