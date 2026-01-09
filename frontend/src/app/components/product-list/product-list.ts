import { Component, Input, OnInit } from '@angular/core';
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
export class ProductListComponent implements OnInit {
  @Input() products?: any[];

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    if (!this.products) {
        this.productService.getAllProducts().subscribe({
            next: data => {
                this.products = data;
            },
            error: err => {
                console.error(err);
            }
        });
    }
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    alert('Product added to cart!');
  }
}
