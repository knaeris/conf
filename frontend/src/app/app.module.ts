import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {NewConferenceFormComponent} from './components/new-conference-form/new-conference-form.component';
import {BaseService} from './services/base-service';
import {ConferenceService} from './services/conference-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InputComponent} from './components/labeled-form-element/form-elements/input/input.component';
import {SafeHtmlPipe} from './pipes/safe-html-pipe';
import {ConferenceRoomService} from './services/conference-room-service';
import {ManageComponent} from './components/manage/manage.component';
import {AppRoutingModule} from './app-routing.module';
import {UserService} from './services/user.service';
import {ConferenceListComponent} from './components/conference-list/conference-list.component';
import {ConferenceDetailComponent} from './components/conference-detail/conference-detail.component';
import {PersonDataInputFormComponent} from './components/person-data-input-form/person-data-input-form.component';
import {LabeledFormElementComponent} from './components/labeled-form-element/labeled-form-element.component';
import {DatepickerComponent} from './components/labeled-form-element/form-elements/datepicker/datepicker.component';
import {SelectComponent} from './components/labeled-form-element/form-elements/select/select.component';
import { SignUpComponent } from './components/signup/sign-up.component';
import {AuthGuard} from "./guards/auth-guard";
import {AuthInterceptor} from "./interceptors/auth-interceptor";
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewConferenceFormComponent,
    InputComponent,
    SafeHtmlPipe,
    ManageComponent,
    ConferenceListComponent,
    ConferenceDetailComponent,
    PersonDataInputFormComponent,
    LabeledFormElementComponent,
    DatepickerComponent,
    SelectComponent,
    SignUpComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true},
    BaseService, ConferenceService, ConferenceRoomService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
