package com.naeris.conference.controllers;

import com.naeris.conference.exceptions.ConferenceNotFoundException;
import com.naeris.conference.model.Conference;
import com.naeris.conference.model.Host;
import com.naeris.conference.model.Participant;
import com.naeris.conference.model.PersonData;
import com.naeris.conference.repositories.ConferenceRepository;
import com.naeris.conference.repositories.PersonDataRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/conferences")
public class ConferenceController {

    private final ConferenceRepository conferenceRepository;
    private final PersonDataRepository personRepository;

    public ConferenceController(ConferenceRepository conferenceRepository, PersonDataRepository personRepository) {
        this.conferenceRepository = conferenceRepository;
        this.personRepository = personRepository;
    }

    @PostMapping
    public Conference createNewConference(@RequestBody Conference conference) {
        return conferenceRepository.save(conference);
    }

    @GetMapping(value = "/{conferenceId}")
    public Conference getConferenceById(@PathVariable("conferenceId") String conferenceId) {
        return conferenceRepository
                .findById(conferenceId)
                .orElseThrow(ConferenceNotFoundException::new);
    }

    @PostMapping(value = "/{conferenceId}")
    public Conference addParticipantToConference(@PathVariable("conferenceId") String conferenceId, @RequestBody PersonData personData) {
        Conference conference = conferenceRepository
                .findById(conferenceId)
                .orElseThrow(ConferenceNotFoundException::new);

        Optional<PersonData> match = personRepository.findFirstThatMatches(personData.getFirstName(), personData.getLastName(), personData.getDateOfBirth());
        if (match.isPresent()) {
            conference.getParticipants().add(new Participant(match.get()));
            return conferenceRepository.save(conference);
        }

        personData = personRepository.save(personData);
        conference.getParticipants().add(new Participant(personData));
        return conferenceRepository.save(conference);
    }

    @DeleteMapping(value = "/{conferenceId}/{participantPersonDataId}")
    public Conference removeParticipantFromConference(@PathVariable("conferenceId") String conferenceId, @PathVariable("participantPersonDataId") String participantPersonDataId) {
        Conference conference = conferenceRepository
                .findById(conferenceId)
                .orElseThrow(ConferenceNotFoundException::new);
        conference
                .getParticipants()
                .removeIf(p -> p.getPersonData() != null && p.getPersonData().getId().equals(participantPersonDataId));
        return conferenceRepository.save(conference);
    }

    @PostMapping(value = "/{conferenceId}/cancel")
    public Conference cancel(@PathVariable("conferenceId") String conferenceId) {
        Conference conference = conferenceRepository
                .findById(conferenceId)
                .orElseThrow(ConferenceNotFoundException::new);
        conference.setCancelled(true);
        return conferenceRepository.save(conference);
    }

    @GetMapping(value = "/by-person/{personId}/hosted")
    public List<Conference> getHostedConferencesByPerson(@PathVariable("personId") String personId) {
        Optional<PersonData> personData = personRepository.findById(personId);
        return personData.map(data -> conferenceRepository.findByHost(new Host(data))).orElseThrow(ConferenceNotFoundException::new);
    }

    @GetMapping(value = "/by-person/{personId}/participated")
    public List<Conference> getParticipatedConferencesByPerson(@PathVariable("personId") String personId) {
        Optional<PersonData> personData = personRepository.findById(personId);
        return personData.map(data -> conferenceRepository.findByParticipantsContains(new Participant(data))).orElseThrow(ConferenceNotFoundException::new);
    }
}
