import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = '/api/products';
const CAT_API_URL = '/api/categories';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(API_URL);
  }

  getProduct(id: any): Observable<any> {
    return this.http.get(`${API_URL}/${id}`);
  }

  getProductsByCategory(categoryId: any): Observable<any> {
    return this.http.get(`${API_URL}/category/${categoryId}`);
  }

  searchProducts(name: string): Observable<any> {
    return this.http.get(`${API_URL}/search?name=${name}`);
  }
  
  getAllCategories(): Observable<any> {
    return this.http.get(CAT_API_URL);
  }

  // Admin functions
  createProduct(product: any): Observable<any> {
    return this.http.post(API_URL, product);
  }

  updateProduct(id: any, product: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, product);
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}
