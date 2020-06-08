package com.naeris.conference.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Map;
import java.util.Objects;

@Document
@Setter
@Getter
@NoArgsConstructor
public class PersonData implements Serializable {

    @Id
    private String id;

    private String firstName;

    private String lastName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    @JsonProperty("personData")
    private void unpackNameFromNestedObject(Map<String, String> brand) {
        firstName = brand.get("firstName");
        lastName = brand.get("lastName");
        dateOfBirth = LocalDate.parse(brand.get("dateOfBirth"));
    }
}
