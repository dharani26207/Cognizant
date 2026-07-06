package com.cognizant.springlearn.dao;

import java.util.ArrayList;

import com.cognizant.springlearn.model.Department;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Repository;

@Repository
public class DepartmentDao {

	public static ArrayList<Department> DEPARTMENT_LIST;

	public DepartmentDao() {
		try (ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("employee.xml")) {
			DEPARTMENT_LIST = context.getBean("departmentList", ArrayList.class);
		}
	}

	public ArrayList<Department> getAllDepartments() {
		return DEPARTMENT_LIST;
	}
}
