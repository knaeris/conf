package com.naeris.conference.service.impl;

import com.naeris.conference.model.User;
import com.naeris.conference.model.UserDetailsImpl;
import com.naeris.conference.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	private final UserRepository daoUserRepository;

	public UserDetailsServiceImpl(UserRepository daoUserRepository) {
		this.daoUserRepository = daoUserRepository;
	}

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = daoUserRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

		return UserDetailsImpl.build(user);
	}

}