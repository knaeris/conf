package com.naeris.conference.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@RequiredArgsConstructor
@Setter
@Getter
@AllArgsConstructor
public class Host {

    private PersonData personData;
}
