import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Dilema } from '../dilema.model';

@Injectable({
  providedIn: 'root'
})
export class DilemaService {

  private apiURL = "http://127.0.0.1:8000/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  store(dilemaData: Dilema): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/dilemas/create`, dilemaData, this.httpOptions);
  }

  obtenerDilemas(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiURL}/dilemas`);
  }

  obtenerDilemasAdmin(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiURL}/dilemas/admin`);
  }
  delete(id:Number){
    return this.httpClient.delete<Dilema>(this.apiURL + '/dilemas/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  errorHandler(error: any) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = error.error.message;
    } else if (error.status) {
      // Error del lado del servidor
      errorMessage = `Server returned code ${error.status}, error message is: ${error.error}`;
    } else {
      // Error desconocido
      errorMessage = error;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}  
