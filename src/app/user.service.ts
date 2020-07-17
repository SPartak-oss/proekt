import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAnswers, IUser} from './interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // key: boolean;
  constructor(private http: HttpClient) { }
  getUser(): Observable<IUser[]>{
    return this.http.get<IUser[]>('http://localhost:3000/user');
  }

  addUser(u: IUser): Observable<IUser>{
    return this.http.post<IUser>('http://localhost:3000/user', u);
  }
  removeUser(id: number): Observable<void>{
    return this.http.delete<void>('http://localhost:3000/user/' + id);
  }
}
