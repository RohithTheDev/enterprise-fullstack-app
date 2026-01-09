import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage';
import { CartService } from './services/cart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rp-digital-hub';
  isLoggedIn = false;
  username?: string;
  cartItemCount = 0;
  showAdminBoard = false;

  constructor(private storageService: StorageService, private cartService: CartService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
      this.showAdminBoard = user.roles.includes('ROLE_ADMIN');
    }

    this.cartService.cartItems$.subscribe(items => {
        this.cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    });
  }

  logout(): void {
    this.storageService.clean();
    window.location.reload();
  }
}
