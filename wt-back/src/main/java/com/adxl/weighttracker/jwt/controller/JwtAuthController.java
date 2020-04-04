package com.adxl.weighttracker.jwt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.adxl.weighttracker.jwt.service.JwtUserDetailsService;

import com.adxl.weighttracker.jwt.config.JwtTokenUtil;
import com.adxl.weighttracker.jwt.models.JwtRequest;
import com.adxl.weighttracker.jwt.models.JwtResponse;

@RestController
@CrossOrigin
public class JwtAuthController {

  private AuthenticationManager authenticationManager;

  private JwtTokenUtil jwtTokenUtil;

  public JwtAuthController(AuthenticationManager authenticationManager,JwtTokenUtil jwtTokenUtil,JwtUserDetailsService userDetailsService) {
	this.authenticationManager=authenticationManager;
	this.jwtTokenUtil=jwtTokenUtil;
	this.userDetailsService=userDetailsService;
  }

  private JwtUserDetailsService userDetailsService;

  @RequestMapping(value="/login", method=RequestMethod.POST)
  public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

	authenticate(authenticationRequest.getUsername(),authenticationRequest.getPassword());

	final UserDetails userDetails=userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

	final String token=jwtTokenUtil.generateToken(userDetails);

	return ResponseEntity.ok(new JwtResponse(token));
  }

  private void authenticate(String username,String password) throws Exception {
	try
	{
	  //			System.out.println(username+"~"+password);
	  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,password));
	} catch(DisabledException e)
	{
	  System.out.println("User disabled");
	  throw new Exception("USER_DISABLED",e);
	} catch(BadCredentialsException e)
	{
	  System.out.println("Wrong Credentials");
	  throw new Exception("INVALID_CREDENTIALS",e);
	}
  }
}