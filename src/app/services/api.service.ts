import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  addProduct(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/products', data);
  }

  getProducts(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/products');
  }

  updateProduct(data: any, id: number): Observable<any> {
    return this.http.put<any>('http://localhost:3000/products/' + id, data);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>('http://localhost:3000/products/' + id);
  }
}
