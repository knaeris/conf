import { Component, OnInit } from '@angular/core';
import {Conference} from '../../model/conference';
import {ConferenceService} from '../../services/conference-service';
import {ActivatedRoute} from '@angular/router';
import {Participant} from '../../model/participant';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Person} from '../../model/person';

@Component({
  selector: 'app-conference-detail',
  templateUrl: './conference-detail.component.html',
  styleUrls: ['./conference-detail.component.css']
})
export class ConferenceDetailComponent implements OnInit {

  conference: Conference;
  personToAddAsParticipant: Person;

  constructor(private conferenceService: ConferenceService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getConference();
  }

  getConference(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.conferenceService.getById(id).subscribe(response => {
      if (response) {
        this.conference = response;
      }
    });
  }

  cancelConference(): void {
    this.conferenceService.cancel(this.conference).subscribe(response => {
      if (response){
        this.conference.cancelled = response.cancelled;
      }
    });
  }

  remove(participant: Participant): void {
    this.conferenceService.removeParticipantFromConference(participant, this.conference).subscribe(response => {
      if (response){
        this.conference.participants = response.participants;
      }
    });
  }

  addParticipant(): void {
    const participant: Participant = new Participant(this.personToAddAsParticipant);
    this.conferenceService.addParticipantToConference(participant, this.conference).subscribe(response => {
      if (response){
        this.conference.participants = response.participants;
      }
    });

  }

  private createDateString(date: any): string {
    return date.year.toString().padStart(4, '0')
      + '-' + date.month.toString().padStart(2, '0')
      + '-' + date.day.toString().padStart(2, '0');
  }

  getPerson(value: any){
    this.personToAddAsParticipant = value as Person;
  }
}
