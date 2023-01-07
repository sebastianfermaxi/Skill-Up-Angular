import { Component, OnInit } from '@angular/core';
import { APIUser } from 'src/app/core/interfaces/APIUsers';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  spiner:boolean=true
  page: APIUser = {
    previousPage: '',
    nextPage: '',
    data: []
  }
  lastPageNumber:number=1
  
  constructor() { }

  ngOnInit(): void {
    this.getUserPage(1)
  }

  getUserPage(pageNumber:number){
    let route 
    route = pageNumber>1 ? `/?page=${pageNumber}` : ''
    this.spiner = true
    //TODO: Lista de contactos
    /*this.httpS.get(`/users${route}`).subscribe({
      next: res => {
        console.log('En get users',res)
        this.page = res as APIUser
        this.spiner = false
      },
      error: err => console.error(err)
    })*/
  }

  changePage(add:number){
    this.lastPageNumber += add
    this.lastPageNumber = this.lastPageNumber<1 ? 1 : this.lastPageNumber
    this.getUserPage(this.lastPageNumber)
  }

  inputPage(){
    //TODO: Filtrar cambios rapidos en el input
    let number = this.lastPageNumber<1 ? 1 : this.lastPageNumber
    this.getUserPage(number)

  }
}
