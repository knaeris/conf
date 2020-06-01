package com.naeris.conference.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Document
@RequiredArgsConstructor
@Setter
@Getter
public class Conference {

	@Id
	private String id;

	private String name;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
	private LocalDateTime dateTime;

	private Host host;

	private ConferenceRoom conferenceRoom;

	private Integer expectedNumberOfParticipants;

	private Set<Participant> participants = new HashSet<>();

	private boolean cancelled = false;

}
