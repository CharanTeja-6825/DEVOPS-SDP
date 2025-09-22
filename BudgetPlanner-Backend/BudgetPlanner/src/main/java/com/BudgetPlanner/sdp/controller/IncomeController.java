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

import com.BudgetPlanner.sdp.modal.Income;
import com.BudgetPlanner.sdp.repo.IncomeRepository;
import com.BudgetPlanner.sdp.service.IncomeService;

@RestController
@RequestMapping("/income-api")
@CrossOrigin(origins = "*")
public class IncomeController {
	
	
	@Autowired
	IncomeService incomeService;
	@Autowired
	IncomeRepository incomeRepo;
	
	
	@PostMapping("/create")
	public ResponseEntity<Income> createIcome(@RequestBody Income income) {
	     Income curincome =incomeService.createIncome(income);
	     return new ResponseEntity<>(curincome,HttpStatus.CREATED);
	}
	
	
	
	@DeleteMapping("/user/{userid}/income/{incomeid}")
	public ResponseEntity<String> deleteIncome(@PathVariable Long userid,
			@PathVariable Long incomeid){
		Income income = incomeRepo.findIncomeByUserIdAndId(userid, incomeid);
		if(income==null) {
			return new ResponseEntity<String>("income not found",HttpStatus.NOT_FOUND);
		}
		incomeRepo.deleteById(incomeid);
		return new ResponseEntity<String>("income deleted successfully",HttpStatus.OK);
	}
	
	@GetMapping("/getAll/{id}")
	public ResponseEntity<List<Income>> getAllIncomes(@PathVariable Long id) {
	    List<Income> incomes = incomeService.getAllIncomesByUserId(id);
	    return new ResponseEntity<>(incomes, HttpStatus.OK);
	}

	
	
	@GetMapping("/total/{id}")
    public ResponseEntity<Long> getTotalIncome(@PathVariable Long id){
		Long total=incomeService.getTotalIncome(id);
		return new ResponseEntity<Long>(total,HttpStatus.OK);
	}

}
