package com.naeris.conference.controllers;

import com.naeris.conference.config.JwtUtils;
import com.naeris.conference.dtos.UserDTO;
import com.naeris.conference.exceptions.UsernameAlreadyExistsException;
import com.naeris.conference.model.*;
import com.naeris.conference.repositories.PersonDataRepository;
import com.naeris.conference.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private PersonDataRepository personDataRepository;

    private final PasswordEncoder encoder;

    private final JwtUtils jwtUtils;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, PersonDataRepository personDataRepository, PasswordEncoder encoder, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.personDataRepository = personDataRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        UserDTO userDto = new UserDTO(userDetails.getUsername(), userDetails.getPersonData(), jwt);

        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new UsernameAlreadyExistsException("Error: Username is already taken!"));
        }

        User user = new User(signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword()),
                personDataRepository.save(signUpRequest.getPersonData()));

        userRepository.save(user);

        return ResponseEntity.ok(new SignUpSuccessfulMessage("User registered successfully!"));
    }
}