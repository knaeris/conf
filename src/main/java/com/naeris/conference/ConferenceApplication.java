package com.naeris.conference;

import com.naeris.conference.controllers.AuthController;
import com.naeris.conference.model.PersonData;
import com.naeris.conference.model.SignUpRequest;
import com.naeris.conference.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.time.LocalDate;

@SpringBootApplication
public class ConferenceApplication {

    public static void main(String[] args) {
        ApplicationContext applicationContext = SpringApplication.run(ConferenceApplication.class, args);
        AuthController controller = applicationContext.getBean(AuthController.class);
        SignUpRequest request = new SignUpRequest();
        request.setPassword("default");
        request.setUsername("default");
        PersonData personData = new PersonData();
        personData.setLastName("default");
        personData.setFirstName("default");
        personData.setDateOfBirth(LocalDate.of(2000, 1, 1));
        request.setPersonData(personData);
        controller.registerUser(request);
    }

}
