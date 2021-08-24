import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {CartPage} from './cart/cart.page';
import {ConfigService} from './config.service';
import {NgEventBus} from 'ng-event-bus';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  cartItemsCount = 0;

  constructor(public modalCtrl: ModalController, private configService: ConfigService, private eventBus: NgEventBus) {
  }

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: CartPage,
      animated: true,
      backdropDismiss: false,
      cssClass: 'setting-modal',
    });
    return await modal.present();
  }

  ngOnInit() {
    this.cartItemsCount = this.configService.getCartItemsCount();
    this.eventBus.on('updateCartItemsCount').subscribe((meta: any) => {
      this.cartItemsCount = meta.data;
    });
  }

}
