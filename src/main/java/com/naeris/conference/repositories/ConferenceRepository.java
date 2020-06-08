package com.naeris.conference.repositories;

import com.naeris.conference.model.Conference;
import com.naeris.conference.model.Host;
import com.naeris.conference.model.Participant;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ConferenceRepository extends MongoRepository<Conference, String> {

    List<Conference> findByHost(Host host);
    
    List<Conference> findByParticipantsContains(Participant participant);
    
}
