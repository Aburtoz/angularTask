import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensageResponse } from './mensage-response';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

   //Esta URL obtiene el listado de todos las tareas en el backend
   private baseURL= "http://localhost:8092/api/v1";

   constructor(private httpClient: HttpClient) { }

   getAllTask(userId:number): Observable<MensageResponse>{
    return this.httpClient.get<MensageResponse>(`${this.baseURL}/task/user/${userId}`)
  }

  createTask(data:any): Observable<MensageResponse>{
    return  this.httpClient.post<MensageResponse>(`${this.baseURL}/task`,data)
  }

  updateTask(data:any,id:number): Observable<MensageResponse>{
    return  this.httpClient.put<MensageResponse>(`${this.baseURL}/task/${id}`,data)
  }

  deleteTask(id:number): Observable<MensageResponse>{
    return  this.httpClient.delete<MensageResponse>(`${this.baseURL}/task/${id}`)
  }
}
