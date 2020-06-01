package com.naeris.conference.dao;

import com.naeris.conference.model.ConferenceRoom;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ConferenceRoomRepository extends MongoRepository<ConferenceRoom, String> {
}
