import { Component } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { CartPage } from './cart/cart.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // public countitems: number = 0
  constructor(public modalCtrl: ModalController) {}
  async showModal() {
    const modal = await this.modalCtrl.create({
      component: CartPage,
      animated: true,
      backdropDismiss: false,
      cssClass: 'setting-modal',
    });
    return await modal.present();
  }
}
