import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensageResponse } from './mensage-response';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //Esta URL obtiene el listado de todos los empleados en el backend
  private baseURL= "http://localhost:8092/api/v1";

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<MensageResponse>{
    return this.httpClient.get<MensageResponse>(`${this.baseURL}/users`)
  }

  createUser(data:any): Observable<MensageResponse>{
    return  this.httpClient.post<MensageResponse>(`${this.baseURL}/user`,data)
  }

  updateUser(data:any,id:number): Observable<MensageResponse>{
    return  this.httpClient.put<MensageResponse>(`${this.baseURL}/user/${id}`,data)
  }

  deleteUser(id:number): Observable<MensageResponse>{
    return  this.httpClient.delete<MensageResponse>(`${this.baseURL}/user/${id}`)
  }


}
