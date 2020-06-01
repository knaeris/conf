package com.naeris.conference.dao;

import com.naeris.conference.model.Host;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HostRepository extends MongoRepository<Host, String> {
}
