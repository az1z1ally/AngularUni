import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  get<T>(url: string, options?: object): Observable<T> {
    return this.http.get<T>(url, options)
  }

  post<T>(url: string, body: object, options?: object): Observable<T> {
    return this.http.post<T>(url, body, options)
  }
}
