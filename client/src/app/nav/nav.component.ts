import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    
  }

  

  logOut() {
    this.accountService.logOut();
    this.router.navigateByUrl('/');
  }

  
  
}
