import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartItemComponent } from './cart-item.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [CartItemComponent],
  exports: [CartItemComponent]
})
export class CartItemComponentModule {}
