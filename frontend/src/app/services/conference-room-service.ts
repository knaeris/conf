import {BaseService} from './base-service';
import {ConferenceRoom} from '../model/conference-room';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConferenceRoomService extends BaseService {

  getAllRooms(): Observable<ConferenceRoom[]> {
    return super.get('conference-rooms');
  }
}
