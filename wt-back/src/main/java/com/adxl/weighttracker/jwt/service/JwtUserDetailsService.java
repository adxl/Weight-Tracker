package com.adxl.weighttracker.jwt.service;

import com.adxl.weighttracker.repositories.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {

  UserRepository userRepository;

  public JwtUserDetailsService(UserRepository userRepository) {
	this.userRepository=userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	var user = userRepository.findById(username);
    if(user.isPresent())
	{
	  var password = user.get().getPassword();
	  return new User(username,password,new ArrayList<>());
	}
	else
	{
	  //			System.out.println("User: "+username+" not found");
	  throw new UsernameNotFoundException("User: "+username+" not found");
	}
  }
}


