import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from 'src/app/interfaces/task';
import { User } from 'src/app/interfaces/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  taskList: Task[] = []
  checkAddTask: boolean = false
  checkUpdateTask: boolean = false
  selectedTask: Task | null = null;
  user: User | undefined = undefined;

  taskForm = new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[])
  });

  constructor(
    private tasksService : TasksService,
    private localStorageService: LocalStorageService,
    private router: Router,
    ){
  }

  ngOnInit(): void {
      this.user = this.localStorageService.getLocalStorage()
      if(this.user == undefined){
        console.warn("No puedes entrar sin logearte antes")
        this.router.navigate(['/login'])
      }
      this.getListTasks()
    }

    async getListTasks(): Promise<any> {
      try {
        let response = await this.tasksService.getListTasks(this.user?.id!);
        this.taskList = response
      } catch (error){
      console.error(error);
    }
  }

  addTask(){
    this.checkAddTask = true
  }
  cancelSubmit(){
    this.checkAddTask = false
  }

  btnUpdateTask(task: Task){
    this.checkUpdateTask = true
    this.selectedTask = task;

    this.taskForm.setValue({
      title: task.title,
      description: task.description || null
    });
  }

  cancelSubmitUpdate(){
    this.checkUpdateTask = false
  }

  async submitTask(){
    if (this.taskForm.valid) {
      const taskData = {...this.taskForm.value, id: this.selectedTask?.id, done: this.selectedTask?.done } as Task

      if (this.selectedTask) {
        await this.tasksService.putTask(taskData,this.user?.id!);
      } else {
        await this.tasksService.postTask(taskData,this.user?.id!);
      }
      await this.getListTasks();
  }
}

  async deleteTask(task:Task): Promise<any> {
    try {
      await this.tasksService.deleteTask(task);
      } catch (error){
      console.error(error);
    }
    await this.getListTasks();
  }

}
