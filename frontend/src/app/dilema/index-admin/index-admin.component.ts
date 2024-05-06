import { Component } from '@angular/core';

import { DilemaService } from '../dilema.service'; // Importa el servicio DilemaService
import { AuthService, User } from 'src/app/shared/auth.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';
@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrls: ['./index-admin.component.css']
})
export class IndexAdminComponent {
    dilemas: any[] = [];

  constructor(private dilemaService: DilemaService) { }

  ngOnInit(): void {
    this.obtenerDilemasAdmin();
  }

  obtenerDilemasAdmin() {
    this.dilemaService.obtenerDilemasAdmin().subscribe(
      (response: any[]) => {
        this.dilemas = response;
      },
      error => {
        console.error('Error al obtener todos los dilemas:', error);
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
