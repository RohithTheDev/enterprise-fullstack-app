import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';
import { OrderService } from '../../services/order';
import { StorageService } from '../../services/storage';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss']
})
export class CheckoutComponent implements OnInit {
  items: any[] = [];
  totalAmount = 0;
  isLoggedIn = false;
  isProcessing = false;
  errorMessage = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (!this.isLoggedIn) {
        this.router.navigate(['/login']);
        return;
    }
    
    this.cartService.cartItems$.subscribe(items => {
      this.items = items;
      this.totalAmount = this.cartService.getTotalAmount();
      
      if (this.items.length === 0) {
          this.router.navigate(['/cart']);
      }
    });
  }

  placeOrder(): void {
    this.isProcessing = true;
    this.orderService.createOrder(this.items).subscribe({
      next: data => {
        this.cartService.clearCart();
        this.isProcessing = false;
        alert('Order placed successfully!');
        this.router.navigate(['/profile']);
      },
      error: err => {
        this.errorMessage = err.error.message || 'An error occurred while placing the order.';
        this.isProcessing = false;
      }
    });
  }
}
