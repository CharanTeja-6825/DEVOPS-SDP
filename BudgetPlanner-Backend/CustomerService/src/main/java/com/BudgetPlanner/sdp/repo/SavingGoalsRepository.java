package com.BudgetPlanner.sdp.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.BudgetPlanner.sdp.model.SavingGoals;

@Repository
public interface SavingGoalsRepository extends JpaRepository<SavingGoals, Long>{

	List<SavingGoals> getAllSavingGoalsByUserId(Long id);


	SavingGoals findSavingGoalsByUserIdAndId(Long userid, Long goalid);


}
