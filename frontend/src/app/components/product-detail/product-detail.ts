import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.scss']
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getProduct(id);
  }

  getProduct(id: any): void {
    this.productService.getProduct(id).subscribe({
      next: data => {
        this.product = data;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  addToCart(): void {
    this.cartService.addToCart(this.product);
    alert('Product added to cart!');
  }
}
