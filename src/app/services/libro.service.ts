import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private API_URL = 'http://localhost:8080/api/libros'; 

  constructor(private http: HttpClient) { }

  getLibros(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  saveLibro(libro: any): Observable<any> {
    return this.http.post<any>(this.API_URL, libro);
  }
}