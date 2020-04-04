package com.adxl.weighttracker.controllers;

import com.adxl.weighttracker.models.User;
import com.adxl.weighttracker.models.WeightEntry;
import com.adxl.weighttracker.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
public class UserController {

  private UserRepository userRepo;

  public UserController(UserRepository userRepo) {
	this.userRepo=userRepo;
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
	  userRepo.save(user);
  }

  @PostMapping("/u/{id}/e/new")
  public void addEntry(@PathVariable String id,@RequestBody WeightEntry entry) {
	var user=userRepo.findById(id);

	//noinspection OptionalIsPresent
	if(user.isPresent())
	{
	  user.get().addEntry(entry);
	  userRepo.save(user.get());
	}
  }
}
