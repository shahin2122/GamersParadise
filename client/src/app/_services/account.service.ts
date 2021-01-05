import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NavComponent } from '../nav/nav.component';
import { User } from '../_models/user';
import { SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.BaseApiUrl;
  
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private socialAuthService: SocialAuthService,
    private router: Router, ) { }

  login(model: any){
    return this.http.post(this.baseUrl + 'account/login' , model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    )
  }
   
 googleLogin(model: any){
  return this.http.post(this.baseUrl + 'account/external-login', model).pipe(
    map((user: User) => {
      if(user) {
        this.setCurrentUser(user);
       console.log("google login");
      }
      return user;
    })
  );
 }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register' , model).pipe(
      map((user: User) => {
        if(user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(recievedUser: User) {
   
    recievedUser.roles = [];
    const roles = this.getDecodedToken(recievedUser.token).role;
    Array.isArray(roles) ? recievedUser.roles = roles : recievedUser.roles.push(roles);
    
    console.log("user id from account service =" +recievedUser.id);
    
    localStorage.setItem('user', JSON.stringify(recievedUser));
    this.currentUserSource.next(recievedUser);
    this.router.navigateByUrl('/');
  }

  logOut() {
    localStorage.removeItem('user');
    this.socialAuthService.signOut();
    console.log('User has signed out');
    this.currentUserSource.next(null);
    
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
 
  
}
