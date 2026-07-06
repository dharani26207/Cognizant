package com.cognizant.springlearn.service;

import java.util.ArrayList;

import com.cognizant.springlearn.dao.EmployeeDao;
import com.cognizant.springlearn.model.Employee;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeeService {

	private final EmployeeDao employeeDao;

	public EmployeeService(EmployeeDao employeeDao) {
		this.employeeDao = employeeDao;
	}

	@Transactional(readOnly = true)
	public ArrayList<Employee> getAllEmployees() {
		return employeeDao.getAllEmployees();
	}
}
