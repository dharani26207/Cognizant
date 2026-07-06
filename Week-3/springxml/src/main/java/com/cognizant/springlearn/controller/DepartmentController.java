package com.cognizant.springlearn.controller;

import java.util.ArrayList;

import com.cognizant.springlearn.model.Department;
import com.cognizant.springlearn.service.DepartmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DepartmentController {

	private static final Logger LOGGER = LoggerFactory.getLogger(DepartmentController.class);

	private final DepartmentService departmentService;

	public DepartmentController(DepartmentService departmentService) {
		this.departmentService = departmentService;
	}

	@GetMapping("/departments")
	public ArrayList<Department> getAllDepartments() {
		LOGGER.info("START - getAllDepartments()");
		ArrayList<Department> departments = departmentService.getAllDepartments();
		LOGGER.info("END - getAllDepartments()");
		return departments;
	}
}
