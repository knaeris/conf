package com.naeris.conference.controllers;

import com.naeris.conference.repositories.ConferenceRepository;
import com.naeris.conference.repositories.PersonDataRepository;
import com.naeris.conference.repositories.OldUserRepository;
import com.naeris.conference.model.Conference;
import com.naeris.conference.model.Participant;
import com.naeris.conference.model.PersonData;
import com.naeris.conference.model.OldUser;
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

    private final OldUserRepository userRepository;

    private final PersonDataRepository personRepository;

    public UserController(ConferenceRepository conferenceRepository, OldUserRepository userRepository, PersonDataRepository personRepository) {
        this.conferenceRepository = conferenceRepository;
        this.userRepository = userRepository;
        this.personRepository = personRepository;
    }

    static OldUser convert(Participant participant) {
        OldUser user = new OldUser();
        user.setPerson(participant.getPersonData());
        return user;
    }

    @PostMapping
    public OldUser registerOrLogin(@RequestBody OldUser user) {
        List<OldUser> allUsers = userRepository.findAll();
        Optional<OldUser> existingUser = allUsers
                .stream()
                .filter(u -> u.getPerson().equals(user.getPerson()))
                .findFirst();
        return existingUser
                .orElseGet(() -> loginIfBeenParticipant(user).orElse(registerNewUser(user)));

    }

    private Optional<OldUser> loginIfBeenParticipant(OldUser user) {
        List<Conference> allConferences = conferenceRepository.findAll();
        Set<Participant> allParticipants = allConferences
                .stream()
                .flatMap(conference -> conference.getParticipants().stream())
                .collect(Collectors.toSet());
        return allParticipants
                .stream()
                .filter(p -> p.getPersonData().equals(user.getPerson()))
                .findFirst().map(UserController::convert);
    }

    private OldUser registerNewUser(OldUser user) {
        PersonData person = personRepository.save(user.getPerson());
        user.setPerson(person);
        return userRepository.save(user);
    }
}
