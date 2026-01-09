import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage';

const API_URL = 'http://localhost:8080/api/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  createOrder(items: any[]): Observable<any> {
    const orderItems = items.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }));

    return this.http.post(API_URL, { items: orderItems }, this.getHttpOptions());
  }

  getUserOrders(): Observable<any> {
    return this.http.get(`${API_URL}/my-orders`, this.getHttpOptions());
  }

  getAllOrders(): Observable<any> {
    return this.http.get(API_URL, this.getHttpOptions());
  }
  
  updateOrderStatus(orderId: number, status: string): Observable<any> {
      return this.http.put(`${API_URL}/${orderId}/status`, status, this.getHttpOptions());
  }

  private getHttpOptions() {
    const token = this.storageService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }
}
