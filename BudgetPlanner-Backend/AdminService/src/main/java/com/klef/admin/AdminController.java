package com.klef.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("admin")
public class AdminController {
	
	private final String baseUrl = "http://localhost:1432/admin-api/";
	
	@Autowired
	private RestTemplate restTemplate;
	
	@GetMapping("/")
	public String home() {
		return "Admin microservice home";
	}
	
	@GetMapping("/rtm")
	public String adminHome() {
		String response = restTemplate.getForObject(baseUrl, String.class);
		return response;
	}
	
	@GetMapping("/users")
	public ResponseEntity<?> getAllUsers(){
		try {
			UserDTO[] users = restTemplate.getForObject(baseUrl+"users", UserDTO[].class);
			return ResponseEntity.ok(users);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Failed to fetch users");
		}
	}
	
	@DeleteMapping("/users/{uid}")
	public ResponseEntity<String> deleteUser(@PathVariable long uid){
		try {
			restTemplate.delete(baseUrl+"users/"+uid);
			return ResponseEntity.ok("User Deleted Successfully");
		} catch (Exception e) {
			return ResponseEntity.status(404).body("User not found");
		}
	}
	
	
}
