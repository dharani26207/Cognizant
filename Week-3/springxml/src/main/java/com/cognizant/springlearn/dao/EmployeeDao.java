package com.cognizant.springlearn.dao;

import java.util.ArrayList;

import com.cognizant.springlearn.model.Employee;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Repository;

@Repository
public class EmployeeDao {

	public static ArrayList<Employee> EMPLOYEE_LIST;

	public EmployeeDao() {
		try (ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("employee.xml")) {
			EMPLOYEE_LIST = context.getBean("employeeList", ArrayList.class);
		}
	}

	public ArrayList<Employee> getAllEmployees() {
		return EMPLOYEE_LIST;
	}
}
