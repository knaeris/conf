import {Conference} from '../model/conference';
import {BaseService} from './base-service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Participant} from '../model/participant';
import {PersonData} from "../model/person-data";

@Injectable({
  providedIn: 'root'
})
export class ConferenceService extends BaseService {

  create(conference: Conference): Observable<Conference> {
    return super.post('conferences', conference);
  }

  getById(id: string): Observable<Conference> {
    return super.get('conferences/' + id);
  }

  addNewParticipant(personData: PersonData, conference: Conference): Observable<Conference> {
    return super.post('conferences/' + conference.id, personData);
  }

  removeParticipant(participant: Participant, conference: Conference): Observable<Conference> {
    return super.delete('conferences/' + conference.id + '/' + participant.personData.id);
  }

  cancel(conference: Conference): Observable<Conference> {
    return super.post('conferences/' + conference.id + '/cancel');
  }

  getConferences(id: string, type: string): Observable<Conference[]> {
    return super.get('conferences/by-person/' + id + '/' + type);
  }
}
