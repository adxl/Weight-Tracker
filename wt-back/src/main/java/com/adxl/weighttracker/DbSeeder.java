package com.adxl.weighttracker;

import com.adxl.weighttracker.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DbSeeder implements CommandLineRunner {

  private final UserRepository userRepo;

  public DbSeeder(UserRepository userRepo) {
	this.userRepo=userRepo;
  }

  @Override
  public void run(String... args) throws Exception {
	//	  userRepo.deleteAll();
  }
}
