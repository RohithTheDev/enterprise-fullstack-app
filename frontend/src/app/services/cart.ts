import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>(this.getCartItemsFromStorage());
  public cartItems$ = this.cartItems.asObservable();

  constructor() {}

  getCartItems() {
    return this.cartItems.value;
  }

  addToCart(product: any) {
    const currentItems = this.getCartItems();
    const existingItem = currentItems.find((item: any) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentItems.push({ product: product, quantity: 1 });
    }

    this.updateCart(currentItems);
  }

  removeFromCart(productId: any) {
    const currentItems = this.getCartItems().filter((item: any) => item.product.id !== productId);
    this.updateCart(currentItems);
  }

  updateQuantity(productId: any, quantity: number) {
    const currentItems = this.getCartItems();
    const item = currentItems.find((item: any) => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
        return;
      }
    }
    this.updateCart(currentItems);
  }

  clearCart() {
    this.updateCart([]);
  }

  getTotalAmount() {
    return this.getCartItems().reduce((acc: number, item: any) => acc + (item.product.price * item.quantity), 0);
  }

  private updateCart(items: any[]) {
    this.cartItems.next(items);
    localStorage.setItem('cart', JSON.stringify(items));
  }

  private getCartItemsFromStorage(): any[] {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }
}
