import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor() { }

  saveLocalStorage(user: any): void {
    localStorage.setItem('login', JSON.stringify(user));
    this.userSubject.next(user);
  }

  getLocalStorage():any{
    return JSON.parse(localStorage.getItem('login')!)
  }
}
