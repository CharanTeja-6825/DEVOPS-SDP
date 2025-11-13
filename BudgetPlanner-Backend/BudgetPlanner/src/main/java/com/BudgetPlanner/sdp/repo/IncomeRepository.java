package com.BudgetPlanner.sdp.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.BudgetPlanner.sdp.model.Income;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long>{
	List<Income> getAllIncomesByUserId(Long id);

	Income findIncomeByUserIdAndId(Long userid, Long incomeid);
}
