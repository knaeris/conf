package com.naeris.conference.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@RequiredArgsConstructor
public class LoginRequest implements Serializable {

    private String username;

    private String password;
}