import {Conference} from '../model/conference';
import {BaseService} from './base-service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Participant} from '../model/participant';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService extends BaseService{

  create(conference: Conference): Observable<Conference> {
    return super.post('conferences', conference);
  }

  getById(id: string): Observable<Conference> {
    return super.get('conferences/' + id);
  }

  addParticipantToConference(participant: Participant, conference: Conference): Observable<Conference> {
    return super.post('conferences/' + conference.id, participant);
  }

  removeParticipantFromConference(participant: Participant, conference: Conference): Observable<Conference>{
    return super.delete('conferences/' + conference.id + '/' + participant.person.id);
  }

  cancel(conference: Conference): Observable<Conference> {
    return super.post('conference/' + conference.id + '/cancel');
  }
}
