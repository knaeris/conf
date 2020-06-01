package com.naeris.conference.controllers;

import com.naeris.conference.dao.ConferenceRepository;
import com.naeris.conference.dao.ParticipantRepository;
import com.naeris.conference.dao.PersonRepository;
import com.naeris.conference.exceptions.ConferenceNotFoundException;
import com.naeris.conference.model.Conference;
import com.naeris.conference.model.Participant;
import com.naeris.conference.model.Person;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/conferences")
public class ConferenceController {

	private final ConferenceRepository conferenceRepository;
	private final ParticipantRepository participantRepository;
	private final PersonRepository personRepository;

	public ConferenceController(ConferenceRepository conferenceRepository, ParticipantRepository participantRepository, PersonRepository personRepository) {
		this.conferenceRepository = conferenceRepository;
		this.participantRepository = participantRepository;
		this.personRepository = personRepository;
	}

	@PostMapping
	public Conference createNewConference(@RequestBody Conference conference ){
		return conferenceRepository.save(conference);
	}

	@GetMapping(value = "/{conferenceId}")
	public Conference getConferenceById(@PathVariable("conferenceId") String conferenceId){
		return conferenceRepository
				.findById(conferenceId)
				.orElseThrow(ConferenceNotFoundException::new);
	}

	@PostMapping(value =  "/{conferenceId}")
	public Conference addParticipantToConference(@PathVariable("conferenceId") String conferenceId, @RequestBody Participant participant){
		Conference conference = conferenceRepository
				.findById(conferenceId)
				.orElseThrow(ConferenceNotFoundException::new);
		List<Participant> allParticipants = participantRepository.findAll();
		Optional<Participant> existingParticipant = allParticipants.
				stream()
				.filter(p -> p.getPerson().equals(participant.getPerson()))
				.findFirst();
		if(existingParticipant.isPresent()){
			conference.getParticipants().add(existingParticipant.get());
			return conference;
		}
		Person person = personRepository.save(participant.getPerson());
		participant.setPerson(person);
		conference.getParticipants().add(participant);
		return conferenceRepository.save(conference);
	}

	@DeleteMapping(value = "/{conferenceId}/{participantId}")
	public Conference removeParticipantFromConference(@PathVariable("conferenceId") String conferenceId, @PathVariable("participantId") String participantId) {
		Conference conference = conferenceRepository
				.findById(conferenceId)
				.orElseThrow(ConferenceNotFoundException::new);
		conference
				.getParticipants()
				.removeIf(p -> p.getPerson().getId().equals(participantId));
		return conferenceRepository.save(conference);
	}

	@PostMapping(value =  "/{conferenceId}/cancel")
	public Conference cancel(@PathVariable("conferenceId") String conferenceId) {
		Conference conference = conferenceRepository
				.findById(conferenceId)
				.orElseThrow(ConferenceNotFoundException::new);
		conference.setCancelled(true);
		return conferenceRepository.save(conference);
	}
}
