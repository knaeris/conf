import {Component, Input, OnInit} from '@angular/core';
import {Conference} from '../../model/conference';

@Component({
  selector: 'app-conference-list',
  templateUrl: './conference-list.component.html',
  styleUrls: ['./conference-list.component.css']
})
export class ConferenceListComponent implements OnInit {

  @Input() hosted: boolean;
  @Input() visit: boolean;
  @Input() history: boolean;
  conferences: Conference[];

  constructor() { }

  // Todo
  ngOnInit(): void {
    this.conferences = null;
  }

}
