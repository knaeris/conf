package com.naeris.conference.service;

import com.naeris.conference.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

public interface UserDetailsService {
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);
}