package com.naeris.conference.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter
@Setter
@RequiredArgsConstructor
public class ConferenceRoom {

    @Id
    private String id;

    private String name;

    private Location location;

    private Integer maxSeats;
}
