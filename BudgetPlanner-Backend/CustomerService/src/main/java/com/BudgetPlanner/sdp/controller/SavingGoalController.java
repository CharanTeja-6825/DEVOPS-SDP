package com.BudgetPlanner.sdp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BudgetPlanner.sdp.model.SavingGoals;
import com.BudgetPlanner.sdp.repo.SavingGoalsRepository;
import com.BudgetPlanner.sdp.service.SavingGoalsService;

@RestController
@RequestMapping("/goal-api")
@CrossOrigin(origins = "*")
public class SavingGoalController {
	
	@Autowired
	SavingGoalsService goalService;
	
	@Autowired
	SavingGoalsRepository goalRepo;

	 @GetMapping("/")
    public String goals() {
        return "this is goals controller";
    }

	
	@PostMapping("/create")
	public ResponseEntity<SavingGoals> create(@RequestBody SavingGoals goal){
		SavingGoals curgoal=goalService.create(goal);
		return new ResponseEntity<SavingGoals>(curgoal,HttpStatus.CREATED);
	}
	
	@DeleteMapping("user/{userid}/goal/{goalid}")
	public ResponseEntity<String> delete(@PathVariable Long userid,
			@PathVariable Long goalid){
		if(!goalRepo.existsById(goalid)) {
			return new ResponseEntity<String>("not found goal",HttpStatus.NOT_FOUND);
		}
		goalService.deleteGoal(goalid);
		return new ResponseEntity<String>("successfully deleted ",HttpStatus.OK);
	}
	
	@PutMapping("/addamount/user/{userid}/goal/{goalid}/amount/{amount}")
	public ResponseEntity<String> addAmount(@PathVariable Long goalid ,@PathVariable Long userid, @PathVariable Long amount){
		SavingGoals goals=goalRepo.findSavingGoalsByUserIdAndId(userid, goalid);
		if(goals==null)
			return new ResponseEntity<String>("goal not found",HttpStatus.NOT_FOUND);
		
		goalService.addAmount(goalid, amount);
		return new ResponseEntity<String>("added amount ",HttpStatus.OK);
	}
	
	
	@GetMapping("getAll/{userid}")
	public ResponseEntity<List<SavingGoals>> getAll(@PathVariable Long userid){
		List<SavingGoals> goals=goalService.getAllSavingGoalsByUserId(userid);
		return new ResponseEntity<List<SavingGoals>>(goals,HttpStatus.OK);
	}
	
}

