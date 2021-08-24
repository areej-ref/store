import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public products: Array<any> = [];

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    this.products = this.configService.getProducts(1);
  }
}
