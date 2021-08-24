import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ConfigService} from '../config.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  public items: Array<any> = [];
  totalPrice = 0;

  constructor(public modalCtrl: ModalController, private configService: ConfigService, public alertController: AlertController) {
  }

  ngOnInit() {
    this.items = this.configService.getCartItems();
    this.items.forEach(item => {
      if (item.discount > 0) {
        this.totalPrice += (item.price - item.price * item.discount / 100) * item.quantity;
      } else {
        this.totalPrice += item.price * item.quantity;
      }
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  getCartItems() {
    return this.configService.getCartItems();
  }

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

  updatePrice(data) {
    let price = 0;
    if (data.item.discount > 0) {
      price = data.item.price - data.item.price * data.item.discount / 100;
    } else {
      price = data.item.price;
    }
    if (data.action === '+') {
      this.totalPrice += price;
    } else {
      this.totalPrice -= price;
    }
  }
}
