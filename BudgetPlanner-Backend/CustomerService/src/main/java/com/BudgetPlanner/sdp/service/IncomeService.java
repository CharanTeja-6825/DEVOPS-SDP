package com.BudgetPlanner.sdp.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BudgetPlanner.sdp.model.Income;
import com.BudgetPlanner.sdp.repo.IncomeRepository;

@Service
public class IncomeService {
	
	@Autowired
	public IncomeRepository incomeRepo;
	
	public List<Income> getAllIncomesByUserId(Long id){
		return incomeRepo.getAllIncomesByUserId(id);
	}
	public Income createIncome(Income income) {
		return incomeRepo.save(income);
	}
	
	public void deleteIncome(Long id) {
		if(!incomeRepo.existsById(id)) {
			throw new RuntimeException("no income found with this id");
		}
		incomeRepo.deleteById(id);;
	}
	

	
	public Long getTotalIncome(Long id) {
    	List<Income> incomes=incomeRepo.getAllIncomesByUserId(id);
    	Long total=0L;
    	for(Income income:incomes) {
    		total+=income.getAmount();
    	}
    	return total;
    }
	
}
