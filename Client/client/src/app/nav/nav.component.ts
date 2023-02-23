import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  //fruit = 'apple';

  model : any = {};
  // loggedIn: boolean = false;
  // currentUser$: Observable<User> | undefined;

  constructor(public accountService: AccountService,
    private router: Router){}

  ngOnInit(): void {
  //  this.getCurrentUser();
  // this.currentUser$ = this.accountService.currentUser$;
  }

  login(){
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      // this.loggedIn = true;
      this.router.navigateByUrl("/items");
    }, error => {
      console.log(error);
      
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl("/");
    // this.loggedIn = false;
  }

  // changeFruit(){
  //   this.fruit = 'banana';
  // }

  // getCurrentUser(){
  //   this.accountService.currentUser$.subscribe(user => {
  //     this.loggedIn = !!user;
  //   }, err => {
  //     console.log(err);
      
  //   })
  // }
  



}
