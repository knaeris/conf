package com.naeris.conference.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Participant {

    private PersonData personData;

    @JsonProperty("personData")
    private void unpackNameFromNestedObject(Map<String, PersonData> brand) {
        personData = brand.get("personData");
    }

}
