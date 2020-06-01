package com.naeris.conference.controllers;

import com.naeris.conference.dao.ConferenceRoomRepository;
import com.naeris.conference.model.ConferenceRoom;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(value = "/conference-rooms")
public class ConferenceRoomController {

	private final ConferenceRoomRepository repository;

	public ConferenceRoomController(ConferenceRoomRepository repository) {
		this.repository = repository;
	}

	@GetMapping
	public List<ConferenceRoom> getAll(){
		return  repository.findAll();
	}

	@PostMapping
	public ConferenceRoom addNewConferenceRoom(@RequestBody ConferenceRoom conferenceRoom) {
		return repository.save(conferenceRoom);
	}

	@DeleteMapping
	public void removeAllRooms(){
		repository.deleteAll();
	}
}
