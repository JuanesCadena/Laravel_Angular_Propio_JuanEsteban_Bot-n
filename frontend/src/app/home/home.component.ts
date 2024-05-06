import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Dilema } from '../dilema'; // Importa la interfaz del modelo de dilema si es necesario
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  randomDilema: Dilema | undefined; // Declara la variable randomDilema de tipo Dilema

  constructor(private apiService: ApiService, private router: Router) { }


  ngOnInit(): void {
    this.showRandomDilema();
  }

  showRandomDilema(): void {
    this.apiService.getRandomDilema().subscribe(
      (data) => {
        console.log('Dilema aleatorio:', data);
        this.randomDilema = data; // Asigna el dilema obtenido
      },
      (error) => {
        console.error('Error al obtener el dilema aleatorio:', error);
      }
    );
  }

  

  redirectToResponsePage() {
    this.router.navigate(['/response']); // Redirige a la ruta '/response'
  }

}
