import {Component, OnDestroy, OnInit, ViewChild, ɵSafeHtml} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Host} from '../../model/host';
import {Person} from '../../model/person';
import {ConferenceRoom} from '../../model/conference-room';
import {Conference} from '../../model/conference';
import {ConferenceService} from '../../services/conference-service';
import {ConferenceRoomService} from '../../services/conference-room-service';
import {UserService} from '../../services/user.service';
import {User} from '../../model/user';
import {LoginComponent} from '../login/login.component';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-conference-form',
  templateUrl: './new-conference-form.component.html',
  styleUrls: ['./new-conference-form.component.css']
})
export class NewConferenceFormComponent implements OnInit, OnDestroy{

  conferenceForm: FormGroup;
  conferenceRooms: ConferenceRoom[];
  isUserLoggedIn: boolean;
  userLoggedFromThisPage: boolean;
  userLoggedIn: Subscription;
  person: Person;

  constructor(private formBuilder: FormBuilder, private conferenceService: ConferenceService,
              private conferenceRoomService: ConferenceRoomService, private userService: UserService, private router: Router) {
    this.conferenceForm = this.formBuilder.group({
      conferenceName: '',
      conferenceDate: this.todayDate(),
      conferenceTime: {hour: 1, minute: 1},
      conferenceRoom: '',
      expectedNumberOfParticipants: ''
    });
  }

  ngOnInit(): void {
    this.getConferenceRooms();
    this.userLoggedIn = this.userService.userLoggedIn.subscribe(() => {
      this.isUserLoggedIn = UserService.isUserLoggedIn();
      if (this.isUserLoggedIn && this.userLoggedFromThisPage) {
        this.createNewConference();
      }
    });
  }

  todayDate(): object {
    const now: Date = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDay()
    };
  }

  getConferenceRooms(): void{
    const conferenceRooms$ = this.conferenceRoomService.getAllRooms().subscribe(response => {
      if (response){
        this.conferenceRooms = response;
      }
      conferenceRooms$.unsubscribe();
    });
  }

   submit(){
    if (!this.isUserLoggedIn){
        this.userService.logIn(this.person).add(() => {
          this.userLoggedFromThisPage = true;
        }).unsubscribe();
    } else {
      this.createNewConference();
    }
  }

  getPerson(value: any): void {
    this.person = value as Person;
  }

  createNewConference(): void {
    const user: User = UserService.getLoggedInUser();
    const host: Host = new Host(user);
    const conference: Conference = new Conference();
    conference.conferenceRoom = this.value('conferenceRoom') as ConferenceRoom;
    conference.name = this.value('conferenceName');
    conference.host = host;
    conference.dateTime = this.createDateTimeString(this.value('conferenceDate'), this.value('conferenceTime'));
    conference.expectedNumberOfParticipants = Number(this.value('expectedNumberOfParticipants'));
    const conference$ = this.conferenceService.create(conference).subscribe(response => {
      if (response){
        conference.id = response.id;
        this.router.navigate(['/conference-detail', conference.id]);
      }
      conference$.unsubscribe();
    });
  }

  value(field: string): any {
    return this.conferenceForm.controls[field].value;
  }

  private createDateString(date: any): string {
    return date.year.toString().padStart(4, '0')
      + '-' + date.month.toString().padStart(2, '0')
      + '-' + date.day.toString().padStart(2, '0');
  }

  private createDateTimeString(date: any, time: any): string {
    return this.createDateString(date)
      + ' ' + time.hour.toString().padStart(2, '0')
      + ':' + time.minute.toString().padStart(2, '0');
  }

  expectedNumberOfParticipantsExceedsMaximumSeats(): boolean {
    const expectedNumberOfParticipants: number = Number(this.value('expectedNumberOfParticipants'));
    const conferenceRoom: ConferenceRoom = this.value('conferenceRoom') as ConferenceRoom;
    return expectedNumberOfParticipants > conferenceRoom.maxSeats;
  }

  ngOnDestroy(): void {
    this.userLoggedIn.unsubscribe();
  }
}
