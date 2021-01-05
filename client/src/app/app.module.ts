import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeModule } from './home/home.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { AdminPannelComponent } from './admin/admin-pannel/admin-pannel.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { MemberCardComponent } from './admin/member-card/member-card.component';
import { MemberAreaComponent } from './member-area/member-area.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MemberDetailsComponent } from './admin/member-details/member-details.component';
import { MemberEditComponent } from './admin/member-edit/member-edit.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AdminEditsMemberComponent } from './admin/admin-edits-member/admin-edits-member.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    AdminPannelComponent,
    UserManagementComponent,
    MemberCardComponent,
    MemberAreaComponent,
    MemberDetailsComponent,
    MemberEditComponent,
    AdminEditsMemberComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    HomeModule,
    SharedModule,
    SocialLoginModule,
    NgxSpinnerModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: 'SocialAuthServiceConfig', useValue: {
      autoLogin: false,providers: [{
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
          '457129431480-i2ccv21apspie73npcv9b0rvjr2jl2lt.apps.googleusercontent.com'
        )
      }]
    }as SocialAuthServiceConfig,
  }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
