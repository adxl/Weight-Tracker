package com.adxl.weighttracker.repositories;

import com.adxl.weighttracker.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User,String> {
}
