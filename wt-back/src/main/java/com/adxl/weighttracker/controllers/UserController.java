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

	if(entry.getDate()==null)
	  entry.setDate();

	if(user.isPresent() && !user.get().hasEntry(entry))
	{
	  user.get().addEntry(entry);
	  userRepo.save(user.get());
	}
  }

  @PostMapping("/u/{id}/e/edit")
  public void editEntry(@PathVariable String id,@RequestBody WeightEntry[] entries) {
	var user=userRepo.findById(id);
	var oldEntry=entries[0];
	var newEntry=entries[1];

	if(user.isPresent() && user.get().hasEntry(oldEntry))
	{
	  user.get().editEntry(oldEntry,newEntry);
	  userRepo.save(user.get());
	}
  }

  @DeleteMapping("/u/{id}/e/delete")
  public void deleteEntry(@PathVariable String id,@RequestBody WeightEntry entry) {
	var user=userRepo.findById(id);
	if(user.isPresent() && user.get().hasEntry(entry))
	{
	  user.get().deleteEntry(entry);
	  userRepo.save(user.get());
	}
  }

  @DeleteMapping("/u/{id}/e/clear")
  public void clearEntries(@PathVariable String id)
  {
    var user=userRepo.findById(id);
    if(user.isPresent())
	{
	  user.get().clearEntries();
	  userRepo.save(user.get());
	}
  }
}
