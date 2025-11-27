package com.klef.admin;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AdminService {
	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private AdminRepository adminRepository;
	
	private final String baseUrl = "http://localhost:1432/admin-api/";
	
	public List<UserDTO> getAllUsers() {
        UserDTO[] users  = restTemplate.getForObject(baseUrl+"all", UserDTO[].class);
        return Arrays.asList(users);
    }

   
    public String deleteUser(Long id) {
    	try {
			restTemplate.delete(baseUrl+"users/"+id);
			return "User Deleted Successfully";
		} catch (Exception e) {
			return "User not found";
		}
    }
    
    public Admin adminLogin(Admin admin) {
    	Admin adm = adminRepository.findByUsernameAndPassword(admin.getUsername(), admin.getPassword());
    	return adm;
    }
	
}

