// dilema.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dilema } from './dilema.model';

@Injectable({
  providedIn: 'root'
})
export class DilemaService {

  private apiUrl = 'http://tu-api.com/api/home';

  constructor(private http: HttpClient) { }

  getRandomDilema(): Observable<Dilema> {
    return this.http.get<Dilema>(this.apiUrl);
  }
}
