package com.ipen.portal.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ipen.portal.model.User;
import com.ipen.portal.service.UserService;

@RestController
@RequestMapping("/user/")
public class UserController {
public static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private UserService userService;
	
	@GetMapping("validate/{username}/{password}")
    public User addConcept(@PathVariable(value= "username") String username, @PathVariable(value= "password") String password){
		logger.info("Validating Data...");
        return userService.findByUsernameAndPassword(username, password);
    }
	
	@PostMapping("add")
    public User addUser(@RequestBody User user){
		logger.info("Add User : {}", user);
        return userService.addUser(user);
    }
	

}
