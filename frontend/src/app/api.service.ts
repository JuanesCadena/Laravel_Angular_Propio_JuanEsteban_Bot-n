import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Dilema } from './dilema';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8000/api/'; // URL base de tu backend Laravel


  constructor(private http: HttpClient) { }


  getRandomDilema(): Observable<Dilema> {
    return this.http.get<Dilema>(this.baseUrl + 'home').pipe(
      catchError(this.errorHandler)
    );
  }



  handleResponse(dilemaId: number, respuesta: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${dilemaId}`, { respuesta });
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }



}



