import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {ManageComponent} from './components/manage/manage.component';
import {LoginComponent} from './components/login/login.component';
import {NewConferenceFormComponent} from './components/new-conference-form/new-conference-form.component';
import {ConferenceDetailComponent} from './components/conference-detail/conference-detail.component';

const routes: Routes = [
    {path: '', component: NewConferenceFormComponent},
    {path: 'login', component: LoginComponent},
    {path: 'manage', component: ManageComponent},
    {path: 'new-conference', component: NewConferenceFormComponent},
    {path: 'conference-detail/:id', component: ConferenceDetailComponent},
    {path: '**', component: AppComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
