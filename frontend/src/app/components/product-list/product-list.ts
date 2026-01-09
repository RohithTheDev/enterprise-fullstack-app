import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input() products?: any[];

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    console.log('ProductListComponent: ngOnInit. products input:', this.products);

    // Fetch products if:
    // 1. products input is undefined (direct navigation to /products)
    // 2. products input is null (explicitly cleared)
    // 3. products input is an empty array (parent might be loading or failed)
    if (!this.products || this.products.length === 0) {
      console.log('ProductListComponent: products input is null/undefined/empty, fetching...');
      this.fetchProducts();
    } else {
      console.log('ProductListComponent: products input is defined, length:', this.products.length);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      console.log('ProductListComponent: ngOnChanges. products updated:', this.products);
    }
  }

  fetchProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        console.log('ProductListComponent: Successfully fetched products:', data);
        this.products = data;
        if (!data || data.length === 0) {
          console.warn('ProductListComponent: Received empty products array from service');
        }
      },
      error: (err) => {
        console.error('ProductListComponent: Failed to fetch products:', err);
      }
    });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    alert('Product added to cart!');
  }
}
