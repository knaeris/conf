package com.naeris.conference.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Objects;

@Getter
@Setter
public class UserDetailsImpl implements UserDetails {

	private String id;

	private String username;

	@JsonIgnore
	private String password;

	private PersonData personData;


	public UserDetailsImpl(String id, String username, String password, PersonData personData) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.personData = personData;
	}

	public static UserDetailsImpl build(User user) {

		return new UserDetailsImpl(
				user.getId(), 
				user.getUsername(),
				user.getPassword(),
				user.getPersonData());
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return new ArrayList<>();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(id, user.id);
	}
}