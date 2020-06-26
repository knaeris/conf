package com.naeris.conference.controllers;

import com.naeris.conference.model.Conference;
import com.naeris.conference.model.PersonData;
import com.naeris.conference.service.ConferenceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/conferences")
public class ConferenceController {

    private final ConferenceService conferenceService;

    public ConferenceController(ConferenceService conferenceService) {
        this.conferenceService = conferenceService;
    }

    @PostMapping
    public Conference createNewConference(@RequestBody Conference conferenceModel) {
        return conferenceService.createNewConference(conferenceModel);
    }

    @GetMapping(value = "/{conferenceId}")
    public Conference getConferenceById(@PathVariable("conferenceId") String conferenceId) {
        return conferenceService.getConferenceById(conferenceId);
    }

    @PostMapping(value = "/{conferenceId}")
    public Conference addParticipantToConference(@PathVariable("conferenceId") String conferenceId, @RequestBody PersonData personData) {
        return conferenceService.addParticipantToConference(conferenceId, personData);
    }

    @DeleteMapping(value = "/{conferenceId}/{participantPersonDataId}")
    public Conference removeParticipantFromConference(@PathVariable("conferenceId") String conferenceId, @PathVariable("participantPersonDataId") String participantPersonDataId) {
        return conferenceService.removeParticipantFromConference(conferenceId, participantPersonDataId);
    }

    @PostMapping(value = "/{conferenceId}/cancel")
    public Conference cancel(@PathVariable("conferenceId") String conferenceId) {
        return conferenceService.cancel(conferenceId);
    }

    @GetMapping(value = "/by-person/{personId}/hosted")
    public List<Conference> getHostedConferencesByPerson(@PathVariable("personId") String personId) {
        return conferenceService.getHostedConferencesByPerson(personId);
    }

    @GetMapping(value = "/by-person/{personId}/participated")
    public List<Conference> getParticipatedConferencesByPerson(@PathVariable("personId") String personId) {
        return conferenceService.getHostedConferencesByPerson(personId);
    }
}
