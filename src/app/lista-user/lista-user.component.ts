import { Component,ViewChild,ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-lista-user',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './lista-user.component.html',
  styleUrl: './lista-user.component.css'
})
export class ListaUserComponent {

  @ViewChild('closeModal') closeModal: ElementRef
  @ViewChild('closeModalConfirm') closeModalConfirm: ElementRef

  usuarios: User[];
  user:User;
  idUserDelete:number;

  constructor(private usersService: UsersService){
    this.user=new User();
  }

  ngOnInit():void{
    this.obtenerUsuarios();
  }


  private obtenerUsuarios(){
    this.usersService.getAllUsers().subscribe(items=> {
      this.usuarios=items.object;
    });
  }


  selectUserToDelete(id:number){
    this.idUserDelete=id;
  }

  selectUserToEdit(user:User){
    this.user=user;
    console.log(user)
  }

  deleteUser(){
    this.usersService.deleteUser(this.idUserDelete).subscribe(item=>{
      this.obtenerUsuarios();
      this.idUserDelete=0;
      this.closeModalConfirm.nativeElement.click()
   });;
  }


  saveUsuario(){
    if(this.user.id==0)
    {
      this.user.createdAt=new Date();
      this.user.updatedAt=new Date();
      this.usersService.createUser(this.user).subscribe(item=>{
         this.obtenerUsuarios();
         this.user=new User();
         this.closeModal.nativeElement.click()
      });
    }else{
      this.user.updatedAt=new Date();
      this.usersService.updateUser(this.user,this.user.id).subscribe(item=>{
         this.obtenerUsuarios();
         this.user=new User();
         this.closeModal.nativeElement.click()
      });
    }
   
  }
}