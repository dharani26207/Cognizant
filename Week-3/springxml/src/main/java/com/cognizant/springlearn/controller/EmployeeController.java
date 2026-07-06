package com.cognizant.springlearn.controller;

import java.util.ArrayList;

import com.cognizant.springlearn.model.Employee;
import com.cognizant.springlearn.service.EmployeeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {

	private static final Logger LOGGER = LoggerFactory.getLogger(EmployeeController.class);

	private final EmployeeService employeeService;

	public EmployeeController(EmployeeService employeeService) {
		this.employeeService = employeeService;
	}

	@GetMapping("/employees")
	public ArrayList<Employee> getAllEmployees() {
		LOGGER.info("START - getAllEmployees()");
		ArrayList<Employee> employees = employeeService.getAllEmployees();
		LOGGER.info("END - getAllEmployees()");
		return employees;
	}
}
