package com.naeris.conference.dao;

import com.naeris.conference.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
