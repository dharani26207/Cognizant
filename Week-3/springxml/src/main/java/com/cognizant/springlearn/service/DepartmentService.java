package com.cognizant.springlearn.service;

import java.util.ArrayList;

import com.cognizant.springlearn.dao.DepartmentDao;
import com.cognizant.springlearn.model.Department;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DepartmentService {

	private final DepartmentDao departmentDao;

	public DepartmentService(DepartmentDao departmentDao) {
		this.departmentDao = departmentDao;
	}

	@Transactional(readOnly = true)
	public ArrayList<Department> getAllDepartments() {
		return departmentDao.getAllDepartments();
	}
}
