package com.naeris.conference.model;

import lombok.Getter;

import java.io.Serializable;

public class SignUpSuccessfulMessage implements Serializable {

    @Getter
    private String message;

    public SignUpSuccessfulMessage(String message) {
        this.message = message;
    }


}
