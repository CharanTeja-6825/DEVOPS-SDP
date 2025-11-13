package com.BudgetPlanner.sdp.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BudgetPlanner.sdp.model.Expense;
import com.BudgetPlanner.sdp.repo.ExpenseRepository;

@Service
public class ExpenseService {
	
	@Autowired
	ExpenseRepository expenseRepo;
	
	public Expense createExpense(Expense expense) {
		return expenseRepo.save(expense);
	}
	
	public void deleteExpense(Long id) {
		if(!expenseRepo.existsById(id)) {
			throw new RuntimeException("no expense found");
		}
		expenseRepo.deleteById(id);
	}
	
	
	
	public List<Expense> getAllExpensesByUser(Long id){
		List<Expense> expenses = expenseRepo.getAllExpensesByUserId(id);
		return expenses;
	}
	
	public Long getTotalExpenses(Long id){
		Long total=0L;
		List<Expense> expenses = expenseRepo.getAllExpensesByUserId(id);
		
		for(Expense expense : expenses) {
			total+=expense.getAmount();
		}
		return total;
	}
}
