package com.naeris.conference.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Document
@RequiredArgsConstructor
@Setter
@Getter
public class Host {

	private User user;

	private Set<Conference> hostedConferences = new HashSet<>();
}
