import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductListComponent, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  products?: any[];
  loading = true;
  error = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    console.log('HomeComponent: Initializing and fetching products...');
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        console.log('HomeComponent: Successfully fetched products:', data);
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('HomeComponent: Error fetching products:', err);
        this.error = 'Failed to load featured products. Please try again later.';
        this.loading = false;
      }
    });
  }
}
