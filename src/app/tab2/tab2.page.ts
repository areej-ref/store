import { Component } from '@angular/core';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [ConfigService]
})
export class Tab2Page {
  public products: Array<any> = [];

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    this.products = this.configService.getProduct(2);
  }

  addToCart(item: any) {
    this.configService.addToCart(item);
  }
}
