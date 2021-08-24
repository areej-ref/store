import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [ConfigService]
})
export class Tab2Page implements OnInit{
  public products: Array<any> = [];

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    this.products = this.configService.getProducts(2);
  }
}
