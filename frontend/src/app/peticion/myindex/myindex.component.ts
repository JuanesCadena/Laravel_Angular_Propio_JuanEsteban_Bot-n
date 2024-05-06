import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../peticion';
import { AuthService, User } from 'src/app/shared/auth.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';
      
@Component({
  selector: 'app-index',
  templateUrl: './myindex.component.html',
  styleUrls: ['./myindex.component.css']
})
export class MyIndexComponent implements OnInit {
      
  peticiones: Peticion[] = [];
  isSignedIn!: boolean;
  loggedUser!: User;
  categoria:number=0;
  serverURL = "http://localhost:8000/"
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public peticionService: PeticionService,
    private authService: AuthService,
    private auth: AuthStateService,
    public token: TokenService,
    public routes: Router,
    ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.peticionService.get().subscribe((data: Peticion[])=>{
      this.peticiones = data;
      console.log(this.peticiones);
    })  
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
    this.getUserLogged();
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  deletePeticion(id:number){
    this.peticionService.delete(id).subscribe(res => {
         this.peticiones = this.peticiones.filter(item => item.id !== id);
         console.log('Post deleted successfully!');
    })
  }
    getUserLogged(){
      this.authService.profileUser().subscribe((data)=>{
        this.loggedUser = data;
        console.log(this.loggedUser);
      })
      console.log(this.loggedUser)
    }
}