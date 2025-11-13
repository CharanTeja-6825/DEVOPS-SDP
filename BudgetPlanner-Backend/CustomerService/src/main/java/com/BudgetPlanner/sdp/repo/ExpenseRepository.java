package com.BudgetPlanner.sdp.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.BudgetPlanner.sdp.model.Expense;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long>{
	List<Expense> getAllExpensesByUserId(Long id);

	Expense findExpenseByUserIdAndId(Long userid, Long expenseid);
}
