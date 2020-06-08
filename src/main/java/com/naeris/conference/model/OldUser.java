package com.naeris.conference.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@RequiredArgsConstructor
@Setter
public class OldUser {

    @Getter
    private PersonData person;
}
