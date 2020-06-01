package com.naeris.conference.controllers;

import com.naeris.conference.dao.ConferenceRepository;
import com.naeris.conference.dao.PersonRepository;
import com.naeris.conference.dao.UserRepository;
import com.naeris.conference.model.Conference;
import com.naeris.conference.model.Participant;
import com.naeris.conference.model.Person;
import com.naeris.conference.model.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/users")
public class UserController {

	private final ConferenceRepository conferenceRepository;

	private final UserRepository userRepository;

	private final PersonRepository personRepository;

	public UserController(ConferenceRepository conferenceRepository, UserRepository userRepository, PersonRepository personRepository) {
		this.conferenceRepository = conferenceRepository;
		this.userRepository = userRepository;
		this.personRepository = personRepository;
	}

	@PostMapping
	public User registerOrLogin(@RequestBody User user){
		List<User> allUsers = userRepository.findAll();
		Optional<User> existingUser = allUsers
				.stream()
				.filter(u -> u.getPerson().equals(user.getPerson()))
				.findFirst();
		return existingUser
				.orElseGet(() -> loginIfBeenParticipant(user).orElse(registerNewUser(user)));

	}

	private Optional<User> loginIfBeenParticipant(User user){
		List<Conference> allConferences = conferenceRepository.findAll();
		Set<Participant> allParticipants = allConferences
				.stream()
				.flatMap(conference -> conference.getParticipants().stream())
				.collect(Collectors.toSet());
		return allParticipants
				.stream()
				.filter(p -> p.getPerson().equals(user.getPerson()))
				.findFirst().map(UserController::convert);
	}

	private User registerNewUser(User user){
		Person person = personRepository.save(user.getPerson());
		user.setPerson(person);
		return userRepository.save(user);
	}

	static User convert(Participant participant){
		User user = new User();
		user.setPerson(participant.getPerson());
		return user;
	}
}
