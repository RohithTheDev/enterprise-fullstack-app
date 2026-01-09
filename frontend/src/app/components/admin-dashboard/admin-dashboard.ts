import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';
import { OrderService } from '../../services/order';
import { StorageService } from '../../services/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss']
})
export class AdminDashboardComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  orders: any[] = [];
  pendingOrdersCount: number = 0;

  newProduct: any = {
      name: '',
      description: '',
      price: 0,
      stockQuantity: 0,
      imageUrl: '',
      category: null
  };
  
  editingProduct: any = null;

  constructor(
      private productService: ProductService, 
      private orderService: OrderService,
      private storageService: StorageService,
      private router: Router
  ) { }

  ngOnInit(): void {
      const user = this.storageService.getUser();
      if (!user || !user.roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/home']);
          return;
      }
      
      this.loadProducts();
      this.loadCategories();
      this.loadOrders();
  }
  
  loadProducts(): void {
      this.productService.getAllProducts().subscribe(data => this.products = data);
  }
  
  loadCategories(): void {
      this.productService.getAllCategories().subscribe(data => this.categories = data);
  }
  
  loadOrders(): void {
      this.orderService.getAllOrders().subscribe(data => {
          this.orders = data;
          this.pendingOrdersCount = this.orders.filter(o => o.status === 'PENDING').length;
      });
  }
  
  saveProduct(): void {
      if (this.editingProduct) {
          this.productService.updateProduct(this.editingProduct.id, this.newProduct).subscribe(() => {
              this.loadProducts();
              this.resetForm();
          });
      } else {
          this.productService.createProduct(this.newProduct).subscribe(() => {
              this.loadProducts();
              this.resetForm();
          });
      }
  }
  
  editProduct(product: any): void {
      this.editingProduct = product;
      this.newProduct = { ...product };
  }
  
  deleteProduct(id: number): void {
      if (confirm('Are you sure?')) {
          this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
      }
  }
  
  resetForm(): void {
      this.editingProduct = null;
      this.newProduct = {
          name: '',
          description: '',
          price: 0,
          stockQuantity: 0,
          imageUrl: '',
          category: null
      };
  }
  
  updateOrderStatus(orderId: number, status: string): void {
      this.orderService.updateOrderStatus(orderId, status).subscribe(() => this.loadOrders());
  }
}
