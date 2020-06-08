package com.naeris.conference.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter
@Setter
public class User {

    @Id
    private String id;

    private String username;

    private String password;

    private PersonData personData;

    public User(String username, String password, PersonData personData) {
        this.username = username;
        this.password = password;
        this.personData = personData;
    }
}
