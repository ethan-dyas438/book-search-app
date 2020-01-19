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
    this.book = this.book.replace(/[-| ]/g, '');
    let validISBN = "";

    const alert = await this.alertController.create({
      header: 'ISBN Error',
      message: 'The ISBN number you entered is not a valid ISBN number.',
      buttons: ['OK']
    });
    
    if (this.book.length == 10) {
      validISBN = this.book;
      let isbnCheck = (10 * +validISBN[0] + 9 * +validISBN[1] + 8 * +validISBN[2] + 7 * +validISBN[3] + 6 * +validISBN[4]
        + 5 * +validISBN[5] + 4 * +validISBN[6] + 3 * +validISBN[7] + 2 * +validISBN[8] + 1 * +validISBN[9]) % 11;
      if (isbnCheck == 0) {
        validISBN = "978" + this.book;
        let newCheckDigit = (1 * +validISBN[0] + 3 * +validISBN[1] + 1 * +validISBN[2] + 3 * +validISBN[3] + 1 * +validISBN[4]
          + 3 * +validISBN[5] + 1 * +validISBN[6] + 3 * +validISBN[7] + 1 * +validISBN[8] + 3 * +validISBN[9] + 1 * +validISBN[10] + 3 * +validISBN[11]) % 10;
        validISBN = validISBN.slice(0, 12) + newCheckDigit.toString();
      } else {
        await alert.present();
        validISBN = "";
      }
    } else if (this.book.length == 13) {
      validISBN = this.book;
    }

    if (validISBN != "" && validISBN.length == 13) {
      let isbnCheck = (1 * +validISBN[0] + 3 * +validISBN[1] + 1 * +validISBN[2] + 3 * +validISBN[3] + 1 * +validISBN[4]
        + 3 * +validISBN[5] + 1 * +validISBN[6] + 3 * +validISBN[7] + 1 * +validISBN[8] + 3 * +validISBN[9]
        + 1 * +validISBN[10] + 3 * +validISBN[11] + 1 * +validISBN[12]) % 10;
      if (isbnCheck == 0) {
        // resutls = await call;
      } else {
        await alert.present();
      }
    } else {
      await alert.present();
    }
  }

}
