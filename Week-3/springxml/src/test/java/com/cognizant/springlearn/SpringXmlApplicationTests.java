package com.cognizant.springlearn;

import static org.assertj.core.api.Assertions.assertThat;

import com.cognizant.springlearn.dao.DepartmentDao;
import com.cognizant.springlearn.dao.EmployeeDao;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SpringXmlApplicationTests {

	@Autowired
	private EmployeeDao employeeDao;

	@Autowired
	private DepartmentDao departmentDao;

	@Test
	void contextLoadsXmlBackedLists() {
		assertThat(employeeDao.getAllEmployees()).hasSize(4);
		assertThat(departmentDao.getAllDepartments()).hasSize(3);
	}
}
