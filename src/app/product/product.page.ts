import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../config.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  product: any = {};

  constructor(private activatedRoute: ActivatedRoute, private configService: ConfigService, private location: Location) {
  }

  ngOnInit() {
    this.product = this.configService.getProduct(Number(this.activatedRoute.snapshot.paramMap.get('id')));
  }

  addToCart() {
    this.configService.addToCart(this.product);
  }

  back() {
    this.location.back();
  }
}
