import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import {ConfigService} from '../config.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  public items: Array<any> = [];
  constructor(public modalCtrl: ModalController, private configService: ConfigService, public alertController: AlertController) {}

  ngOnInit() {
    this.items = this.configService.getCartItems();
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }
  getCartItems(){
    return this.configService.getCartItems();
  }

  // updateQuantity(item: any) {
  //   this.configService.addToCart(item);
  // }

  async delete(item: any) {
    const alert = await this.alertController.create({
      cssClass: 'setting-alert',
      header: 'Confirm!',
      message: 'Do you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Delete',
          handler: () => {
            this.configService.deleteFromCart(item);
          }
        }
      ]
    });

    await alert.present();
  }
}
