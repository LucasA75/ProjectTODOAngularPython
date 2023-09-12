import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  newUser : boolean = false;

  userFormLogin = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });

  constructor(
    private usersServices: UsersService,
    private router: Router,
    private localStorageService: LocalStorageService
    ) {}

  saveLocalStorage(user: User): void {
    this.localStorageService.saveLocalStorage(user)
    this.router.navigate(['tasks']);
  }

  async submitLogin() {
    try{
      if (this.userFormLogin.valid) {
        const userData = { ...this.userFormLogin.value } as User;
        const validUser = await this.usersServices.verifyUser(userData);
        this.saveLocalStorage(validUser);
      }
    }catch(err){
      console.log(err);
    }
  }

  registerNewUser(){
    this.newUser = true;
  }

  submitNewUser(){
    if (this.userFormLogin.valid) {
    this.newUser = false;
    const userData = { ...this.userFormLogin.value } as User
    this.usersServices.postUser(userData)
  }
}
}
