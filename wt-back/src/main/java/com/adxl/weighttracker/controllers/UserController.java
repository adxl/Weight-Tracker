package com.adxl.weighttracker.controllers;

import com.adxl.weighttracker.models.User;
import com.adxl.weighttracker.models.WeightEntry;
import com.adxl.weighttracker.repositories.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepo;

  public UserController(UserRepository userRepo,PasswordEncoder passwordEncoder) {
	this.userRepo=userRepo;
	this.passwordEncoder=passwordEncoder;
  }

  @GetMapping("/u/all/")
  public Iterable<String> getAllUsers() {
	List<String> names=new ArrayList<>();

	for(User user : userRepo.findAll())
	  names.add(user.getUsername());
	return names;
  }

  @GetMapping("/u/") // tested
  public Optional<User> getUserFromToken(Authentication auth) {
	return userRepo.findById(auth.getName());
  }

  @PostMapping("/register/") // tested
  public void addUser(@RequestBody @Valid User user) {
	if(userRepo.findById(user.getUsername()).isEmpty())
	{
	  user.setPassword(passwordEncoder.encode(user.getPassword()));
	  userRepo.save(user);
	}
  }

  @PostMapping("/u/e/new/") // tested
  public void addEntry(Authentication auth,@RequestBody WeightEntry entry) {
	var user=userRepo.findById(auth.getName());

	if(entry.getDate()==null)
	  entry.setDate();

	if(user.isPresent() && !user.get().hasEntry(entry))
	{
	  user.get().addEntry(entry);
	  userRepo.save(user.get());
	}
  }

  @PostMapping("/u/e/edit/") // tested
  public void editEntry(Authentication auth,@RequestBody WeightEntry[] entries) {
	var user=userRepo.findById(auth.getName());
	var oldEntry=entries[0];
	var newEntry=entries[1];

	if(user.isPresent() && user.get().hasEntry(oldEntry))
	{
	  user.get().editEntry(oldEntry,newEntry);
	  userRepo.save(user.get());
	}
  }

  @DeleteMapping("/u/e/delete/") // tested
  public void deleteEntry(Authentication auth,@RequestBody WeightEntry entry) {
	var user=userRepo.findById(auth.getName());
	if(user.isPresent() && user.get().hasEntry(entry))
	{
	  user.get().deleteEntry(entry);
	  userRepo.save(user.get());
	}
  }

  @DeleteMapping("/u/e/clear/") // tested
  public void clearEntries(Authentication auth) {
	var user=userRepo.findById(auth.getName());
	if(user.isPresent())
	{
	  user.get().clearEntries();
	  userRepo.save(user.get());
	}
  }
}
