package com.BudgetPlanner.sdp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BudgetPlanner.sdp.modal.User;
import com.BudgetPlanner.sdp.repo.UserRepository;
import com.BudgetPlanner.sdp.service.UserService;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/user-api")
@CrossOrigin(origins = "*")
public class UserController {
	
	@Autowired
	UserService userService;
	@Autowired 
	UserRepository userRepo;
	
	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody User user) {
		if(userRepo.existsByEmail(user.getEmail())) {
			throw new RuntimeException("email already exists");
		}if(userRepo.existsByUsername(user.getUsername())) {
			throw new RuntimeException("username already exists");
		}
		User saveUser=userService.Register(user);
		return new ResponseEntity<>(saveUser,HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) {

	    User u = userService.login(user.getUsername(), user.getPassword());
	    if (u != null) {
	        return ResponseEntity.ok(u);
	    } else {
	        return ResponseEntity.status(401).body("Invalid credentials");
	    }
	}

}
