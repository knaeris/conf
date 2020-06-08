package com.naeris.conference.repositories;

import com.naeris.conference.model.OldUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OldUserRepository extends MongoRepository<OldUser, String> {
}
