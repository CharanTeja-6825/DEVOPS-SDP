package com.BudgetPlanner.sdp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BudgetPlanner.sdp.modal.User;
import com.BudgetPlanner.sdp.repo.UserRepository;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepo;

    
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

   
    public void deleteUser(Long id) {
        if (!userRepo.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepo.deleteById(id);
    }
}
