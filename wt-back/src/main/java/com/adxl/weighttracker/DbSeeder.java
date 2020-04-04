package com.adxl.weighttracker;

import com.adxl.weighttracker.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;

public class DbSeeder implements CommandLineRunner {

  UserRepository userRepo;

  public DbSeeder(UserRepository userRepo) {
	this.userRepo=userRepo;
  }

  @Override
  public void run(String... args) throws Exception {
	System.out.println(userRepo.findAll());
  }
}
