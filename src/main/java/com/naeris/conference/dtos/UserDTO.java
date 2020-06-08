package com.naeris.conference.dtos;

import com.naeris.conference.model.PersonData;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
public class UserDTO implements Serializable {

	private String username;
	private PersonData personData;
	private String token;

}