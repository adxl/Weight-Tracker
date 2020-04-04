package com.adxl.weighttracker.jwt.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		if("adxl".equals(username))
			return new User("adxl","$2a$10$9MsnUMp.f8WUpFoMtx1YLunrXsN3jTHltvJsYvzjPfLZhinvAF09G",new ArrayList<>());
		else
		{
//			System.out.println("User: "+username+" not found");
			throw new UsernameNotFoundException("User: "+username+" not found");
		}
	}
}


