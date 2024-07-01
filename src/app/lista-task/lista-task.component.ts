import { Component,OnInit,ViewChild,ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { TaskService } from '../task.service';
import { User } from '../user';
import { RouterLink, RouterLinkActive} from '@angular/router';
import { Task } from '../task';

@Component({
  selector: 'app-lista-task',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink, RouterLinkActive],
  templateUrl: './lista-task.component.html',
  styleUrl: './lista-task.component.css'
})
export class ListaTaskComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef
  @ViewChild('closeModalConfirm') closeModalConfirm: ElementRef

  tasks:Task[];
  task:Task;
  userSelected:User;
  nameModal:string;
  idTaskDelete:number;

  constructor(private route: ActivatedRoute,
              private usersService: UsersService,
              private taskService:TaskService) {
                this.task=new Task();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = Number(params.get('id')); // El signo + convierte la cadena a número
      this.usersService.getUserById(id).subscribe(item =>{
        this.userSelected = item.object;
        this.obtenerTareas();
      })
      
    });
  }

  private obtenerTareas(){
    this.taskService.getAllTask(this.userSelected.id).subscribe(items=>{
      this.tasks=items.object;
    })
  }

  createTask(){
    this.nameModal="Crear tarea";
 }

 selectTaskToDelete(id:number){
  this.idTaskDelete=id;
 }

 selectTaskToEdit(task:Task){
  this.task=task;
  this.nameModal="Editar tarea"
 }

 deleteTask(){
    this.taskService.deleteTask(this.idTaskDelete).subscribe(item=>{
      this.obtenerTareas();
      this.idTaskDelete=0;
      this.closeModalConfirm.nativeElement.click()
  });;
 }

 saveTask(){
  if(this.task.id==0)
  {
    this.task.createdAt=new Date();
    this.task.updatedAt=new Date();
    this.task.userId=this.userSelected.id;
    this.taskService.createTask(this.task).subscribe(item=>{
       this.obtenerTareas();
       this.task=new Task();
       this.closeModal.nativeElement.click()
    });
  }else{
    this.task.updatedAt=new Date();
    this.task.userId=this.userSelected.id;
    this.taskService.updateTask(this.task,this.task.id).subscribe(item=>{
       this.obtenerTareas();
       this.task=new Task();
       this.closeModal.nativeElement.click()
    });
  }
 
}

}
