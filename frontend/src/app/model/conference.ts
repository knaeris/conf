import {Host} from './host';
import {ConferenceRoom} from './conference-room';
import {Participant} from './participant';

export class Conference {
  id: string;
  name: string;
  dateTime: string;
  host: Host;
  conferenceRoom: ConferenceRoom;
  expectedNumberOfParticipants: number;
  participants: Participant[];
  cancelled: boolean;
}
