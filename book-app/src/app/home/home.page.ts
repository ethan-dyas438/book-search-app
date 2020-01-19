import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import isbnValidator from 'isbn-validator';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  book: string = "";
  loading: boolean = false;
  //services = ["amazon", "chegg", "unlbkstr"];
  services = ['amazon'];
  serviceLogos = {
    amazon: '../../assets/amazon-logo-rgp.webp',
    unl: '../../assests/nebraska-n.jpg'
  }
  priceResults = [];

  constructor(public alertController: AlertController, private http: HttpClient) {}

  async searchBook() {
    let validISBN = this.book.replace(/[-| ]/g, '');

    const alert = await this.alertController.create({
      header: 'ISBN Error',
      message: 'The ISBN number you entered is not a valid ISBN number.',
      buttons: ['OK']
    });

    let isbnCheck = isbnValidator(validISBN);

    if (isbnCheck) {
      for (const service of this.services) {
        // let results = await this.http.get(`http://localhost:8081/listing/${service}/${validISBN}`);
        console.log(this.http.get(`http://localhost:8081/listing/${service}/${validISBN}`).subscribe((result) => {
          console.log(result);
          let filteredResult = {
            seller: this.serviceLogos[service],
            title: result.title + ", " + result.author,
            link: result.url,
            rent_used_price: result.rentUsedPrice || "---",
            rent_new_price: result.rentNewPrice || "---",
            buy_used_price: result.buyUsedPrice || "---",
            buy_new_price: result.buyNewPrice || "---"
          }
          this.priceResults.push(filteredResult);
        }));
      }
    } else {
      await alert.present();
    }
  }

  openWindow(link: string) {
    window.open(link);
  }

}
