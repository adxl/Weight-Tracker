package com.adxl.weighttracker.controllers;

import com.adxl.weighttracker.models.User;
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
}
