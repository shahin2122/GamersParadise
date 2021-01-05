import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { NavComponent } from '../nav/nav.component';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { map } from 'rxjs/operators';
import { Member } from '../_models/member';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
model: any = {};
externalUser: any;


  constructor(private accountService: AccountService, private router: Router,
              private toastr: ToastrService, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/');
       });
  }



  logInWithGoogle(platform: string): void {
    
    platform = GoogleLoginProvider.PROVIDER_ID;
   
    this.socialAuthService.signIn(platform).then(
    (response) => {
      console.log("response = " + response);
    // this.externalUser = response;
      this.externalUser = {
          id : response.id,
          email : response.email,
          username: response.name,
          firstName: response.firstName,
          lastName: response.lastName,
          pictureUrl: response.photoUrl,
          provider: response.provider,
        };
        console.log("external user =" + this.externalUser);
      
        this.accountService.googleLogin(this.externalUser).subscribe();
      });
  }
}

    


   
  


  
  