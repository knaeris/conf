package com.naeris.conference.dao;

import com.naeris.conference.model.Conference;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ConferenceRepository extends MongoRepository<Conference, String> {
}
