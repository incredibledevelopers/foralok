package com.ipen.portal.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ipen.portal.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
	
	User findByUsernameAndPassword(String username, String password);

}