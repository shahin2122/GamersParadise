import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { Member } from '../_models/member';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model: any = {};
externalUser: any;
  constructor(private accountService: AccountService, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
  }

  register() {
    this.model.Provider = 'Internal';
    this.accountService.register(this.model).subscribe(response =>{
     console.log(response); 
    }, error => {
      console.log(error);
    })
  }


  logInWithGoogle(platform: string): void {
    
    platform = GoogleLoginProvider.PROVIDER_ID;
   
    this.socialAuthService.signIn(platform).then(
    (response) => {
        this.externalUser = {
          userId : response.id,
          email : response.email,
          username: response.name,
          firstName: response.firstName,
          lastName: response.lastName,
          pictureUrl: response.photoUrl,
          provider: response.provider,
        };
        //  console.log(platform + ' logged in user data is= ' , this.externalUser);
         this.accountService.googleLogin(this.externalUser).subscribe();
      });
     };


}
