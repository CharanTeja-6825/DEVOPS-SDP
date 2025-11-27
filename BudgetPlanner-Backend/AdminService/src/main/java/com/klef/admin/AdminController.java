package com.klef.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("admin")
@CrossOrigin("*")
public class AdminController {
	
	private final String baseUrl = "http://localhost:1432/admin-api/";
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private AdminService adminService;
	
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
		return ResponseEntity.status(HttpStatus.FOUND).body(adminService.getAllUsers());
	}
	
	@DeleteMapping("/users/{uid}")
	public ResponseEntity<String> deleteUser(@PathVariable long uid){
		return ResponseEntity.status(HttpStatus.OK).body(adminService.deleteUser(uid));
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> adminLogin(@RequestBody Admin admin){
		Admin adm = adminService.adminLogin(admin);
		if(adm == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username or Password is Incorrect");
		else return ResponseEntity.status(HttpStatus.OK).body("Login Success");
	}
	
}
