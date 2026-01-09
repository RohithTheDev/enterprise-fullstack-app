import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  orders: any[] = [];

  constructor(private storageService: StorageService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    if (this.currentUser) {
        this.orderService.getUserOrders().subscribe({
            next: data => {
                this.orders = data;
            },
            error: err => {
                console.error(err);
            }
        });
    }
  }
}
