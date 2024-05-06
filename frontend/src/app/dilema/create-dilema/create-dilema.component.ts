import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DilemaService } from '../dilema.service';

@Component({
  selector: 'app-create-dilema',
  templateUrl: './create-dilema.component.html',
  styleUrls: ['./create-dilema.component.css']
})
export class CreateDilemaComponent {
  dilemaForm: FormGroup;

  constructor(private fb: FormBuilder, private dilemaService: DilemaService, private router: Router) {
    this.dilemaForm = this.fb.group({
      texto_situacion: ['', Validators.required],
      texto_problema: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.dilemaForm.valid) {
      this.dilemaService.store(this.dilemaForm.value).subscribe(
        response => {
          console.log(response);
          // Redireccionar a la página de dilemas o a donde desees
          this.router.navigate(['/']);
        },
        error => {
          this.router.navigate(['dilemas']);

          // Manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
          // Puedes mostrar el mensaje de error en un componente o utilizar un servicio de notificación
        }
      );
    }
  }
}  