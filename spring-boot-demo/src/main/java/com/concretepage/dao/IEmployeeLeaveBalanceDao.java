package com.concretepage.dao;

import java.util.List;

import com.concretepage.entity.EmployeeLeaveBalance;

public interface IEmployeeLeaveBalanceDao {
	
	int incrementPendingApprovalLeaveBalance(Integer employeeId, Integer year, String leaveType, Float noOfDay);
	
	int decreaseEligibleLeaveBalance(Integer employeeId, Integer year, String leaveType, Float noOfDay);
	
	List<EmployeeLeaveBalance> getLeaveBalance(Integer employeeId, Integer year);
	
	int insertLeaveBalance(Integer employeeId, Integer year, String leaveType, Float noOfDayPending, Float noOfDayEligible);
	
	int incrementLeaveBalance(Integer employeeId, Integer year, String leaveType, Float noOfDayPendingApproval, Float noofDayEligible);
	
	public int incrementLeaveBalanceForAllEmployees( Integer year, String leaveType, Float noofDayEligible);
	
	
}
