import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CategoryInterface } from '../models/category.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http: HttpClient = inject(HttpClient);

  readonly BASE_URL = environment.API_URL;

  constructor() {}

  getCategories(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>(`${this.BASE_URL}api/categories`);
  }
}
