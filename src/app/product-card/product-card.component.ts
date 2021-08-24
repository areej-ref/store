import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-explore-container',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
  }

  addToCart() {
    this.configService.addToCart(this.product);
  }
}
