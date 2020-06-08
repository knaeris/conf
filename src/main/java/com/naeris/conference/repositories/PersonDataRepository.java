package com.naeris.conference.repositories;

import com.naeris.conference.model.PersonData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDate;
import java.util.Optional;

public interface PersonDataRepository extends MongoRepository<PersonData, String> {

    @Query(value = "{'firstName' : ?0, 'lastName': ?1, 'dateOfBirth': ?2}")
    Optional<PersonData> findFirstThatMatches(String firstName, String lastName, LocalDate dateOfBirth);
}
