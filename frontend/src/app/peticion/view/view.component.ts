import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../peticion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Peticion } from '../peticion';
    
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
     
  id!: number;
  peticion!: Peticion;
  image:string="";
  categoria:number=0;
  firmada: boolean = false;
  private serverURL = "http://localhost:8000/"
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public peticionService: PeticionService,
    private route: ActivatedRoute,
    private router: Router
    
   ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['peticionId'];
        
    this.peticionService.find(this.id).subscribe((data: any)=>{
        this.peticion = data;
        this.image = this.serverURL + this.peticion.files[0].file_path;
  
    });
}






firmar(id: number, peticion: Peticion): void {
  console.log("entrando en firmar");
  if (!this.firmada) {
    this.peticionService.firmar(id, peticion).subscribe(
      (data: any) => {
        this.peticion = data;
        this.categoria = this.peticion.categoria_id;
        this.image = this.serverURL + this.peticion.files[0].file_path;
        console.log(data);
        this.firmada = true;
      },
      (error: any) => {
        // Manejar errores aquí si es necesario
        console.error("Error al firmar:", error);
      }
    );
  } else {
    // Petición ya firmada, mostrar mensaje o realizar alguna acción
    console.log("La petición ya ha sido firmada");
    // Puedes mostrar un mensaje al usuario aquí
  }
}

    
}