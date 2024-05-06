import { Component, OnInit } from '@angular/core';
import { DilemaService } from '../dilema.service'; // Importa el servicio DilemaService
import { AuthService, User } from 'src/app/shared/auth.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';
@Component({
  selector: 'app-myindex',
  templateUrl: './myindex.component.html',
  styleUrls: ['./myindex.component.css']
})
export class MyindexComponent implements OnInit {
  dilemas: any[] = [];

  constructor(private dilemaService: DilemaService) { }

  ngOnInit(): void {
    this.obtenerDilemas();
  }

  obtenerDilemas() {
    this.dilemaService.obtenerDilemas().subscribe(
      (response: any[]) => {
        this.dilemas = response;
      },
      error => {
        console.error('Error al obtener dilemas:', error);
      }
    );
  }


  deleteDilema(id: number) {
    this.dilemaService.delete(id).subscribe(
      (res) => {
        this.dilemas = this.dilemas.filter((item) => item.id !== id);
        console.log('Post deleted successfully!');
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }
}  
  

