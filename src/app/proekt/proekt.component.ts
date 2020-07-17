import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Data} from '@angular/router';
import {AnswersService} from '../answers.service';
import {IAnswer, IAnswers, IUser} from '../interface';
import {FormControl, FormGroup} from '@angular/forms';
import {objectKeys} from 'codelyzer/util/objectKeys';
import {UserService} from '../user.service';


@Component({
  selector: 'app-proekt',
  templateUrl: './proekt.component.html',
  styleUrls: ['./proekt.component.css']
})
export class ProektComponent implements OnInit {
  @Output() onAdd: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() key: boolean;
  userName: string;
  userPhone: string;
  id: number;
  num = 2;
  count = 0;
  form: FormGroup;
  msg: string;
  answers: IAnswers[];
  answer: string;
  timer: number;
  intervalID = 0;
  sec: string |number = '00';
  min: string |number = String(this.num);
  hours: string |number = '00';
  // day: string | number;
  styl = 'form-check-input is-valid';


  constructor(private answersService: AnswersService, private userService: UserService) { }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        answers1: new FormControl(name),
        answers2: new FormControl(name),
        answers3: new FormControl(name),
        answers4: new FormControl(name),
        answers5: new FormControl(name),
        answers6: new FormControl(name)
      }
    );
    this.answersService.getAnswers().subscribe((data) => {
        this.answers = data;
      },
      (error) => { console.error('error'); }
    );
    if (this.key) {
      this.userService.getUser().subscribe((data) => {
          this.userName = data[0].name;
          this.userPhone = data[0].phone;
          this.id = data[0].id;
          this.time();
        },
        (error) => { console.error('error'); }
      );
       }
  }
  question(question1, question2: IAnswers ): void{
    for (let x = 2; x < objectKeys(question2).length; x++){
      if (Object.values(question2)[x][0] === question1) {
        Object.values(question2)[x][1] = 'is-invalid';
      }
    }
  }

  check(answer: IAnswers): string{
      for (let x = 2; x < objectKeys(answer).length; x++){
        if (Object.values(answer)[x][1] === 'is-valid') {
          return Object.values(answer)[x][0];
        }
      }
  }
  end(){
    for (let x = 0; x < Object.values(this.form.value).length; x++){
     this.answer = this.check(this.answers[x]);
     if (Object.values(this.form.value)[x] === this.answer) { this.count++; }
      else {
        this.question( Object.values(this.form.value)[x], this.answers[x]);
     }
    }

    if (this.count) { this.msg = 'Вы ответили  ' + this.count + ' / 6 вопросов'; }
    else { this.msg = 'у вас не было никакого ответа'; }

  }
  del(id: number){
    this.userService.removeUser(id).subscribe(() => {
     // this.key = this.userService.key = !this.userService.key;
      this.key = !this.key;
      this.onAdd.emit(this.key);

    });
  }

  time(){
    const  s = new Date();
    const   newdata = new Date(s.getFullYear(), s.getMonth(), s.getDate(), s.getHours(), s.getMinutes() + this.num, s.getSeconds());
    const now = String(newdata);
    const enddata = new Date(now);
    this.intervalID = setInterval(() => {
      this.timer = +enddata - +new Date();
      if (enddata > new Date() && !this.msg) {
       // this.day = Math.floor(this.timer / (60 * 60 * 1000 * 24));
        this.hours = Math.floor(this.timer / (60 * 60 * 1000) % 24);
        this.min = Math.floor(this.timer / (1000 * 60) % 60);
        this.sec = Math.floor(this.timer / 1000 % 60);
       /* if (this.day < 10) {
          this.day = '0' + this.day;
        }*/
        if (this.hours < 10) {
          this.hours = '0' + this.hours;
        }
        if (this.min < 10) {
          this.min = '0' + this.min;
        }
        if (this.sec < 10) {
          this.sec = '0' + this.sec;
        }
      }
      else {
        this.sec = '00';
        this.min = String(this.num);
        this.hours = '00';
        clearInterval(this.intervalID);
        if (enddata < new Date()) { this.end(); }
      }
    }, 1000 );
  }

}
