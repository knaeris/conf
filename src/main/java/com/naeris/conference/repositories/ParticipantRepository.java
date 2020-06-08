package com.naeris.conference.repositories;

import com.naeris.conference.model.Participant;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ParticipantRepository extends MongoRepository<Participant, String> {
}
