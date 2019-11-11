package com.ipen.portal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ipen.portal.model.User;
import com.ipen.portal.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private NextSequenceService nextSequenceService;

	public User findByUsernameAndPassword(String username, String password) {
		User user = userRepository.findByUsernameAndPassword(username, password);
		return user;
	}

	public User addUser(User user) {
		user.setId(nextSequenceService.getNextSequence("customSequences"));
		return userRepository.save(user);
	}
}
