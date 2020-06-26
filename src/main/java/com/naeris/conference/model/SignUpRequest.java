package com.naeris.conference.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Map;

@Getter
@Setter
public class SignUpRequest implements Serializable {

    private String username;


    private String password;


    private PersonData personData;

    @JsonProperty("personData")
    private void unpackNameFromNestedObject(Map<String, PersonData> brand) {
        personData = brand.get("personData");
    }

}
