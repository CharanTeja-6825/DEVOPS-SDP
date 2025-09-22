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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.BudgetPlanner.sdp.modal.Expense;
import com.BudgetPlanner.sdp.repo.ExpenseRepository;
import com.BudgetPlanner.sdp.service.ExpenseService;


@RestController
@RequestMapping("expense-api")
@CrossOrigin(origins = "*")
public class ExpenseController {
	
	@Autowired
	ExpenseService expenseService;
	
	@Autowired
	ExpenseRepository expenseRepo;
	
	@PostMapping("/create")
	public ResponseEntity<Expense> create(@RequestBody Expense expense){
		Expense curExpense = expenseService.createExpense(expense);
		return new ResponseEntity<Expense>(curExpense,HttpStatus.CREATED);
	}
	
	@DeleteMapping("/user/{userid}/expense/{expenseid}")
	public ResponseEntity<String> delete(@PathVariable Long userid,
			@PathVariable Long expenseid){
		
		Expense expense=expenseRepo.findExpenseByUserIdAndId(userid, expenseid);
		if(expense==null) {
			return new ResponseEntity<String>("expense not found",HttpStatus.NOT_FOUND);
		}
		expenseService.deleteExpense(expenseid);
		return new ResponseEntity<String>("deleted successfully",HttpStatus.OK);
	}
	
	@GetMapping("total/{userid}")
	public ResponseEntity<Long> getTotal(@PathVariable Long userid) {
		Long total=expenseService.getTotalExpenses(userid);
		return new ResponseEntity<Long>(total,HttpStatus.OK);
	}
	
	@GetMapping("getAll/user/{userid}")
	public ResponseEntity<List<Expense>> getAll(@PathVariable Long userid){
		List<Expense> expenses=expenseService.getAllExpensesByUser(userid);
		return new ResponseEntity<List<Expense>>(expenses,HttpStatus.OK);
		
	}
}
