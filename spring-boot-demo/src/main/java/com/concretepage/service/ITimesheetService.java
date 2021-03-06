package com.concretepage.service;

import java.util.List;

import com.concretepage.dto.TimesheetDTO;
import com.concretepage.entity.Timesheet;
import com.concretepage.entity.TimesheetSummary;
import com.concretepage.exception.HRException;

public interface ITimesheetService {
	
	void saveTimesheet(List<Timesheet> timesheets) throws HRException;
	
	void updateTimesheet(Long timesheetSequence, List<Timesheet> timesheets) throws HRException ;
	
	List<TimesheetSummary> getTimesheetSummary(Integer employeeId, String startDate, String endDate);
	
	TimesheetDTO getTimesheetDetails(Integer employeeId, String weekStartDate, String weekEndDate) throws HRException;
	
	List<TimesheetSummary> getTimesheetsForApproval(Integer managerId);
	
	void approveTimesheet(Integer employeeId, String weekStartDate, String weekEndDate, String managerComments);
	
	void rejectTimesheet(Integer employeeId, String weekStartDate, String weekEndDate,String managerComments);
	
	TimesheetDTO getTimesheetDetails(long timesheetSequence) throws HRException;
	
	List<TimesheetSummary> getTimesheetsLessByHours(String startDate, String endate, int lessByHours, String departmentCode, String employeeType);

}
