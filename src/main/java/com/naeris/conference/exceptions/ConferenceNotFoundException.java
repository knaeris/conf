package com.naeris.conference.exceptions;

public class ConferenceNotFoundException extends RuntimeException {

	public ConferenceNotFoundException() {
		super("Conference not found");
	}
}
