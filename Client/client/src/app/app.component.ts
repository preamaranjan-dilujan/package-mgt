import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Package management';
  users : any;

  constructor(private http: HttpClient, private accountService: AccountService){}

  ngOnInit() {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userJson = localStorage.getItem('user');
    const user: User = userJson !== null ? JSON.parse(userJson) : null;
    this.accountService.setCurrentUser(user);
  }

  getUsers(){
    this.http.get("https://localhost:44310/api/Users").subscribe(
      response => {
        this.users = response;
      }, error => {
        console.log(error);
        
      }
    )
  }



   
}
