package com.adxl.weighttracker.controllers;

import com.adxl.weighttracker.models.User;
import com.adxl.weighttracker.models.WeightEntry;
import com.adxl.weighttracker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
public class UserController {

  private final PasswordEncoder passwordEncoder;

  private UserRepository userRepo;

  public UserController(UserRepository userRepo,PasswordEncoder passwordEncoder) {
	this.userRepo=userRepo;
	this.passwordEncoder=passwordEncoder;
  }

  @GetMapping("/u")
  public Iterable<User> getAllUsers() {
	return userRepo.findAll();
  }

  @GetMapping("/u/{id}")
  public Optional<User> getUserById(@PathVariable String id) {
	return userRepo.findById(id);
  }

  @PostMapping("/u/new")
  public void addUser(@RequestBody @Valid User user) {
	if(userRepo.findById(user.getUsername()).isEmpty())
	{
	  user.setPassword(passwordEncoder.encode(user.getPassword()));
	  userRepo.save(user);
	}
  }

  @PostMapping("/u/{id}/e/new")
  public void addEntry(@PathVariable String id,@RequestBody WeightEntry entry) {
	var user=userRepo.findById(id);

	//noinspection OptionalIsPresent
	if(user.isPresent())
	{
	  var newEntry=entry;
	  if(entry.getDate()==null)
		newEntry=new WeightEntry(entry.getValue());
	  user.get().addEntry(newEntry);
	  userRepo.save(user.get());
	}
  }
}
