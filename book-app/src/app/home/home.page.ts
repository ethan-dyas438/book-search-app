import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

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

  constructor(public alertController: AlertController) {}

  async searchBook() {
    this.book = this.book.replace("-", "");
    this.book = this.book.replace(" ", "");
    let validISBN = "";
    
    const alert = await this.alertController.create({
      header: 'ISBN Error',
      message: 'The ISBN number you entered is not a valid ISBN number.',
      buttons: ['OK']
    });
    
    if (this.book.length == 10) {
      validISBN = this.book;
    } else if (this.book.length == 13) {
      validISBN = this.book.slice(3, 13);
      let newCheckDigit = (1 * +validISBN[0] + 2 * +validISBN[1] + 3 * +validISBN[2] + 4 * +validISBN[3] + 5 * +validISBN[4]
        + 6 * +validISBN[5] + 7 * +validISBN[6] + 8 * +validISBN[7] + 9 * +validISBN[8]) % 11;
      validISBN = validISBN.slice(0, 9) + newCheckDigit.toString();
    }

    if (validISBN != "" && validISBN.length == 10) {
      let isbnCheck = (10 * +this.book[0] + 9 * +this.book[1] + 8 * +this.book[2] + 7 * +this.book[3] + 6 * +this.book[4]
        + 5 * +this.book[5] + 4 * +this.book[6] + 3 * +this.book[7] + 2 * +this.book[8] + 1 * +this.book[9]) % 11;
      if (isbnCheck == 0) {
        // resutls = await call;
      }
    } else {
      await alert.present();
    }
  }

}
