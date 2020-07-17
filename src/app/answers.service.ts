import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAnswers} from './interface';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  constructor(private http: HttpClient) { }

  getAnswers(): Observable<IAnswers[]>{
    return this.http.get<IAnswers[]>('http://localhost:3000/answers');
  }
}
