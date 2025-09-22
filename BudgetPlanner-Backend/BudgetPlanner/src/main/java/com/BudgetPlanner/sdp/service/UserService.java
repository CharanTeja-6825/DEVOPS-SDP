package com.BudgetPlanner.sdp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BudgetPlanner.sdp.modal.User;
import com.BudgetPlanner.sdp.repo.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepo;
	
	public User login(String username,String password) {
		if(!userRepo.existsByUsernameAndPassword(username,password)) {
			new RuntimeException("invalid Credentials");
		}
		User user=userRepo.findByUsernameAndPassword(username, password);
		if(user != null) {
			return user;
		}
		return null;
	}
	
	public User Register(User user) {
		if(userRepo.existsByUsername(user.getUsername())) {
			throw new RuntimeException("username already exits");
		}
		return userRepo.save(user);
	}
	
	public User updateUser(Long id, User updatedUser) {
	    return userRepo.findById(id).map(existingUser -> {
	        existingUser.setUsername(updatedUser.getUsername());
	        existingUser.setEmail(updatedUser.getEmail());
	        existingUser.setPassword(updatedUser.getPassword());
	        return userRepo.save(existingUser);
	    }).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
	}

	
	
	
}
