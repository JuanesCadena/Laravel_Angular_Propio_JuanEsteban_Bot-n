import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {
  @Input() conteoAceptadas!: number;
  @Input() conteoDenegadas!: number;

  handleResponse(respuesta: string): void {
    console.log('Respuesta:', respuesta);
    // Aquí puedes implementar la lógica para manejar la respuesta "denegada"
  }
}
