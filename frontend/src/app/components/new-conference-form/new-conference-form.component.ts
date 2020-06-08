import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Host} from '../../model/host';
import {PersonData} from '../../model/person-data';
import {ConferenceRoom} from '../../model/conference-room';
import {Conference} from '../../model/conference';
import {ConferenceService} from '../../services/conference-service';
import {ConferenceRoomService} from '../../services/conference-room-service';
import {UserService} from '../../services/user.service';
import {User} from '../../model/user';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NgbCalendar} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-new-conference-form',
  templateUrl: './new-conference-form.component.html',
  styleUrls: ['./new-conference-form.component.css']
})
export class NewConferenceFormComponent implements OnInit, OnDestroy {

  conferenceForm: FormGroup;
  conferenceRooms: ConferenceRoom[];
  person: PersonData;

  constructor(private formBuilder: FormBuilder, private conferenceService: ConferenceService,
              private conferenceRoomService: ConferenceRoomService, private userService: UserService, private router: Router, private calendar: NgbCalendar) {
    this.conferenceForm = this.formBuilder.group({
      conferenceName: '',
      conferenceDate: this.calendar.getToday(),
      conferenceTime: this.currentTime(),
      conferenceRoom: '',
      expectedNumberOfParticipants: ''
    });
  }

  ngOnInit(): void {
    this.getConferenceRooms();
  }

  currentTime(): any {
    const now: Date = new Date();
    return {hour: now.getHours(), minute: now.getMinutes()};
  }

  getConferenceRooms(): void {
    const conferenceRooms$ = this.conferenceRoomService.getAllRooms().subscribe(response => {
      if (response) {
        this.conferenceRooms = response;
      }
      conferenceRooms$.unsubscribe();
    });
  }

  submit() {
    this.createNewConference();
  }

  isUserSignedIn(): boolean {
    return this.userService.isUserSignedIn();
  }

  createNewConference(): void {
    const user: User = this.userService.getSignedInUser();
    const host: Host = new Host(user.personData);
    const conference: Conference = new Conference();
    conference.conferenceRoom = this.value('conferenceRoom') as ConferenceRoom;
    conference.name = this.value('conferenceName');
    conference.host = host;
    conference.dateTime = this.createDateTimeString(this.value('conferenceDate'), this.value('conferenceTime'));
    conference.expectedNumberOfParticipants = Number(this.value('expectedNumberOfParticipants'));
    const conference$ = this.conferenceService.create(conference).subscribe(response => {
      if (response) {
        conference.id = response.id;
        this.router.navigate(['/conference-detail', conference.id]);
      }
      conference$.unsubscribe();
    });
  }

  value(field: string): any {
    return this.conferenceForm.controls[field].value;
  }

  expectedNumberOfParticipantsExceedsMaximumSeats(): boolean {
    const expectedNumberOfParticipants: number = Number(this.value('expectedNumberOfParticipants'));
    const conferenceRoom: ConferenceRoom = this.value('conferenceRoom') as ConferenceRoom;
    return expectedNumberOfParticipants > conferenceRoom.maxSeats;
  }

  ngOnDestroy(): void {
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

}
