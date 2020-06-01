import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {NewConferenceFormComponent} from './components/new-conference-form/new-conference-form.component';
import {BaseService} from './services/base-service';
import {ConferenceService} from './services/conference-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {InputFieldComponent} from './components/input-field/input-field.component';
import {SafeHtmlPipe} from './pipes/safe-html-pipe';
import {ConferenceRoomService} from './services/conference-room-service';
import {ManageComponent} from './components/manage/manage.component';
import {AppRoutingModule} from './app-routing.module';
import {UserService} from './services/user.service';
import { ConferenceListComponent } from './components/conference-list/conference-list.component';
import { ConferenceDetailComponent } from './components/conference-detail/conference-detail.component';
import { PersonDataInputFormComponent } from './components/person-data-input-form/person-data-input-form.component';
import { LabeledInputComponent } from './components/labeled-input/labeled-input.component';
import { InputDatepickerComponent } from './components/input-datepicker/input-datepicker.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewConferenceFormComponent,
    InputFieldComponent,
    SafeHtmlPipe,
    ManageComponent,
    ConferenceListComponent,
    ConferenceDetailComponent,
    PersonDataInputFormComponent,
    LabeledInputComponent,
    InputDatepickerComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [BaseService, ConferenceService, ConferenceRoomService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
