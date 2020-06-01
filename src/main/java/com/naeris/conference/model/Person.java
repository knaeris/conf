package com.naeris.conference.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.Objects;

@Document
@RequiredArgsConstructor
@Setter
@Getter
public class Person {

	@Id
	private String id;

	private String firstName;

	private String lastName;

	private LocalDate dateOfBirth;

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Person person = (Person) o;
		return Objects.equals(firstName, person.firstName) &&
				Objects.equals(lastName, person.lastName) &&
				Objects.equals(dateOfBirth, person.dateOfBirth);
	}

	@Override
	public int hashCode() {
		return Objects.hash(firstName, lastName, dateOfBirth);
	}
}
