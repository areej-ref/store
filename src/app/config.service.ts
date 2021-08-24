import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgEventBus} from 'ng-event-bus';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient, private eventBus: NgEventBus) {
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

  getProducts(category: number) {
    if (localStorage.getItem('data')) {
      const data: any = JSON.parse(localStorage.getItem('data'));
      if (category > 0) {
        return data.products.filter(product => product.category.id === category);
      } else {
      }
      return data;
    }
  }

  getProduct(id: number) {
    const products: Array<any> = JSON.parse(localStorage.getItem('data')).products;
    return products.find(item => item.id === id);
  }

  getCartItems() {
    return localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
  }

  addToCart(item: any) {
    const cartItems: Array<any> = this.getCartItems();
    let isExist = false;
    cartItems.forEach(cartItem => {
      if (item.id === cartItem.id) {
        cartItem.quantity++;
        isExist = true;
      }
    });
    if (!isExist) {
      item.quantity = 1;
      cartItems.push(item);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    let cartItemsCount = (localStorage.getItem('cartItemsCount')) ? JSON.parse(localStorage.getItem('cartItemsCount')) : 0;
    this.setCartItemsCount(++cartItemsCount);
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
    this.setCartItemsCount(--cartItemsCount);
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
    this.setCartItemsCount(++cartItemsCount);
  }

  deleteFromCart(item: any) {
    const cartItems: Array<any> = this.getCartItems();
    let cartItemsCount = (localStorage.getItem('cartItemsCount')) ? JSON.parse(localStorage.getItem('cartItemsCount')) : 0;
    cartItems.forEach((cartItem, index) => {
      if (item.id === cartItem.id) {
        cartItemsCount -= item.quantity;
        cartItems.splice(index, 1);
      }
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    this.setCartItemsCount(cartItemsCount);
  }

  setCartItemsCount(cartItemsCount: number) {
    localStorage.setItem('cartItemsCount', JSON.stringify(cartItemsCount));
    this.eventBus.cast('updateCartItemsCount', cartItemsCount);
  }

  getCartItemsCount() {
    return (localStorage.getItem('cartItemsCount')) ? JSON.parse(localStorage.getItem('cartItemsCount')) : 0;
  }
}
