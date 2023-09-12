import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl: string = "http://localhost:8000/"

  constructor(private httpClient : HttpClient) { }

  //Este metodo recibe los parametros del user y los lanza al backend , si en el backend esta , devuelve 201 , si no esta tira error
  async getListTasks(){
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}tasks/api/v1/tasks/`))
  }

  async postUser(user: User): Promise<void>{
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}user/api/v1/users/`, user))
  }

  async verifyUser(user: User): Promise<User>{
    //Hacer un endpoint que revise el username y la password y devuelva el id y el username
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}user/api/v1/validate/`, user))
  }
}
