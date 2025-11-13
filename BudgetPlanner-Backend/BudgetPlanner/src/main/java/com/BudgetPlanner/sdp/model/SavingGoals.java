package com.BudgetPlanner.sdp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="savingGoals_table")
public class SavingGoals {

	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	Long id;
	@Column(name="goal_name",nullable = false)
	String goalname;
	@Column(name="target_amount",nullable = false)
	Long targetamount;
	@Column(name="current_amount",nullable = false)
	Long currentamount;
	@Column(name="deadline_date",nullable = false)
	String deadlinedate;
	
	
	 @Column(name = "user_id", nullable = false)
	 private Long userId;
	
	public SavingGoals() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getGoalname() {
		return goalname;
	}

	public void setGoalname(String goalname) {
		this.goalname = goalname;
	}

	public Long getTargetamount() {
		return targetamount;
	}

	public void setTargetamount(Long targetamount) {
		this.targetamount = targetamount;
	}

	public Long getCurrentamount() {
		return currentamount;
	}

	public void setCurrentamount(Long currentamount) {
		this.currentamount = currentamount;
	}

	public String getDeadlinedate() {
		return deadlinedate;
	}

	public void setDeadlinedate(String deadlinedate) {
		this.deadlinedate = deadlinedate;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	

	
}
