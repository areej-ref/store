import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {
  }

  async load() {
    if (!localStorage.getItem('data')) {
      await this.http.get<any>('assets/files/data.json')
        .toPromise()
        .then(res =>
          localStorage.setItem('data', JSON.stringify(res.data)));
    }
  }

  getCategories() {
    if (localStorage.getItem('data')) {
      return JSON.parse(localStorage.getItem('data')).categories;
    }
  }

  getProduct(category: number) {
    if (localStorage.getItem('data')) {
      const data: any = JSON.parse(localStorage.getItem('data'));
      if (category > 0) {
        return data.products.filter(product => product.category.id === category);
      } else {
      }
      return data;
    }
  }

  getCartItems() {
    return localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
  }

  setCartItem(cartItems: any) {

  }

  addToCart(item: any) {
    const cartItems: Array<any> = this.getCartItems();
    item.quantity = 1;
    cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    let cartItemsCount = (localStorage.getItem('cartItemsCount')) ? JSON.parse(localStorage.getItem('cartItemsCount')) : 0;
    localStorage.setItem('cartItemsCount', JSON.stringify(++cartItemsCount));
  }

  reduceQuantity(item: any) {
    const cartItems: Array<any> = this.getCartItems();
    cartItems.forEach(cartItem => {
      if (item.id === cartItem.id) {
        cartItem.quantity--;
      }
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    let cartItemsCount = (localStorage.getItem('cartItemsCount')) ? JSON.parse(localStorage.getItem('cartItemsCount')) : 0;
    localStorage.setItem('cartItemsCount', JSON.stringify(--cartItemsCount));
  }

  increaseQuantity(item: any) {
    const cartItems: Array<any> = this.getCartItems();
    cartItems.forEach(cartItem => {
      if (item.id === cartItem.id) {
        cartItem.quantity++;
      }
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    let cartItemsCount = (localStorage.getItem('cartItemsCount')) ? JSON.parse(localStorage.getItem('cartItemsCount')) : 0;
    localStorage.setItem('cartItemsCount', JSON.stringify(++cartItemsCount));
  }

  deleteFromCart(item: any) {
    const cartItems: Array<any> = this.getCartItems();
    cartItems.forEach((cartItem, index) => {
      if (item.id === cartItem.id) {
        cartItems.splice(index, 1);
      }
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
}
