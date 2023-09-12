import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { lastValueFrom } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  baseUrl: string = "http://localhost:8000/"

  constructor(private httpClient : HttpClient) { }

  async getListTasks(userID: number){
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}tasks/user/${userID}/`))
  }

  async postTask(task: Task,userID:number): Promise<void>{
    const data = {ownerTask:userID, ...task}
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}tasks/api/v1/tasks/`, data))
  }

  async putTask(task: Task,userID: number): Promise<void>{
    const data = {ownerTask:userID, ...task}
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl}tasks/api/v1/tasks/${task.id}/`, data))
  }

  async deleteTask(task: Task): Promise<void>{
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}tasks/api/v1/tasks/${task.id}`))
  }

}
