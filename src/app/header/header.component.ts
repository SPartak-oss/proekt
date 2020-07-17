import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  key: boolean;
  form: FormGroup;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
   // this.key = this.userService.key;
    this.form = new FormGroup({
         name: new FormControl('', [Validators.required, Validators.pattern('^[A-Z][A-Za-z\' -]{4,10}$')]),
        phone: new FormControl('', [Validators.required, Validators.pattern('^[+][0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}$')])
      });
  }
  registr(){
    const u = {
        name: this.form.controls.name.value,
        phone: this.form.controls.phone.value
      };
    this.userService.addUser(u).subscribe((data) => {
       // this.key = this.userService.key = !this.userService.key;
        this.key = !this.key;
        this.form.reset();
    },
      (error) => { console.error('error'); }
    );
}



}
