import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminEditsMemberComponent } from './admin/admin-edits-member/admin-edits-member.component';
import { AdminPannelComponent } from './admin/admin-pannel/admin-pannel.component';
import { MemberDetailsComponent } from './admin/member-details/member-details.component';
import { MemberEditComponent } from './admin/member-edit/member-edit.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MemberAreaComponent } from './member-area/member-area.component';
import { RegisterComponent } from './register/register.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [

  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      
      {path: 'member/edit', component: MemberEditComponent,canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'member/:id', component: MemberDetailsComponent},
  
      {path: 'admin', component: AdminPannelComponent, canActivate: [AdminGuard]},
      {path: 'admin/edit-member/:id', component: AdminEditsMemberComponent, canActivate: [AdminGuard], canDeactivate: [PreventUnsavedChangesGuard]},
    ]
  },
  
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
