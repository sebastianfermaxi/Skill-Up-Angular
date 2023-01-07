import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/state/services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ew-perfil-detail',
  templateUrl: './perfil-detail.component.html',
  styleUrls: ['./perfil-detail.component.scss']
})
export class PerfilDetailComponent implements OnInit {
  titulo: string = 'Perfil';
  public perfil: any = [];
  public user: any = [];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.traerLogin();
  }

  //TODO: moverlo al servicio
  traerLogin() {
    this.userService.get('http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/auth/me').subscribe(respuesta => {
      this.perfil = respuesta;
    })
  }
}
//   traerUser(){
//     this.userService.get('http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/users/2328').subscribe
//     (respuesta => {
//       this.perfil = respuesta;
//       console.log(respuesta)
//     })
//   }

//   traerLogin(){
//     this.userService.get('http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/auth/me').subscribe
//     (respuesta => {
//       this.user = respuesta;
//       console.log(respuesta)
//     })
//   