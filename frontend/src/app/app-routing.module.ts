import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {ManageComponent} from './components/manage/manage.component';
import {LoginComponent} from './components/login/login.component';
import {NewConferenceFormComponent} from './components/new-conference-form/new-conference-form.component';
import {ConferenceDetailComponent} from './components/conference-detail/conference-detail.component';
import {SignUpComponent} from "./components/signup/sign-up.component";
import {AuthGuard} from "./guards/auth-guard";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'manage', component: ManageComponent, canActivate: [AuthGuard]},
  {path: 'new-conference', component: NewConferenceFormComponent, canActivate: [AuthGuard]},
  {path: 'conference-detail/:id', component: ConferenceDetailComponent, canActivate: [AuthGuard]},
  {path: '**', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
