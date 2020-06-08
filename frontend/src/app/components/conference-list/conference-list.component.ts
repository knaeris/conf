import {Component, Input, OnInit} from '@angular/core';
import {Conference} from '../../model/conference';
import {UserService} from "../../services/user.service";
import {User} from "../../model/user";
import {ConferenceService} from "../../services/conference-service";

@Component({
  selector: 'app-conference-list',
  templateUrl: './conference-list.component.html',
  styleUrls: ['./conference-list.component.css']
})
export class ConferenceListComponent implements OnInit {

  @Input() listType: string;
  conferences: Conference[];

  constructor(private conferenceService: ConferenceService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.getConferences();
  }

  getConferences(): void {
    const id: string = this.userService.getSignedInUser().personData.id;
    this.conferenceService.getConferences(id, this.listType).subscribe(conferences => {
      this.conferences = conferences;
    })
  }
}
