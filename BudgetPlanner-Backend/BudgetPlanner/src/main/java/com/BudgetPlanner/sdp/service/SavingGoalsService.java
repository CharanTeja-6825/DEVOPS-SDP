package com.BudgetPlanner.sdp.service;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BudgetPlanner.sdp.modal.SavingGoals;
import com.BudgetPlanner.sdp.repo.SavingGoalsRepository;

@Service
public class SavingGoalsService {
	
	@Autowired
	SavingGoalsRepository savingRepo;
	
	public SavingGoals create(SavingGoals goal) {
		return savingRepo.save(goal);
	}
	
	public void deleteGoal(Long id) {
		if(!savingRepo.existsById(id))
			throw new RuntimeException("no saving Goals found");
		savingRepo.deleteById(id);
	}
	
	public List<SavingGoals> getAllSavingGoalsByUserId(Long id){
		List<SavingGoals> goals=savingRepo.getAllSavingGoalsByUserId(id);
		return goals;
	}
	
	public void addAmount(Long id,Long amount) {
		Optional<SavingGoals> goal = savingRepo.findById(id);
		if(goal.isPresent()){
			SavingGoals goalObj = goal.get();
			Long curamount=goalObj.getCurrentamount()+amount;
			goalObj.setCurrentamount(curamount);
		}else{
			System.out.println("Goal not Found");
		}
	}
	
}
