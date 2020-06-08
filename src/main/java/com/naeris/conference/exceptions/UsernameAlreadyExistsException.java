package com.naeris.conference.exceptions;

import javax.naming.AuthenticationException;

public class UsernameAlreadyExistsException extends AuthenticationException {

    public UsernameAlreadyExistsException(String explanation) {
        super(explanation);
    }
}
