import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {

  @Input() item: any;
  @Output() delete = new EventEmitter<any>();
  @Output() updateQuantity = new EventEmitter<any>();

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
  }

  reduceQuantity() {
    if (this.item.quantity > 1) {
      this.configService.reduceQuantity(this.item);
      this.item.quantity--;
      this.updateQuantity.emit({item: this.item, action: '-'});
    }
  }

  increaseQuantity() {
    this.configService.increaseQuantity(this.item);
    this.item.quantity++;
    this.updateQuantity.emit({item: this.item, action: '+'});
  }
}
