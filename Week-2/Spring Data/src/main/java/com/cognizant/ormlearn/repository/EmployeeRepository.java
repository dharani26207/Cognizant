package com.cognizant.ormlearn.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.cognizant.ormlearn.model.Employee;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    List<Employee> findByNameContainingIgnoreCase(String text);

    List<Employee> findByNameStartingWithIgnoreCase(String prefix);

    List<Employee> findByJoiningDateBetween(LocalDate startDate, LocalDate endDate);

    List<Employee> findBySalaryGreaterThan(Double salary);

    List<Employee> findBySalaryLessThan(Double salary);

    List<Employee> findTop3ByOrderBySalaryDesc();

    List<Employee> findByDepartmentName(String departmentName, Sort sort);

    @Query("select e from Employee e where e.department.name = :departmentName "
            + "and e.salary >= :minimumSalary order by e.salary desc")
    List<Employee> findHighEarnersByDepartment(
            @Param("departmentName") String departmentName,
            @Param("minimumSalary") Double minimumSalary);

    @Query("select distinct e from Employee e join fetch e.skills where e.id = :employeeId")
    Optional<Employee> findByIdWithSkills(@Param("employeeId") Integer employeeId);

    @Query("select e.department.name, count(e), avg(e.salary), max(e.salary), min(e.salary) "
            + "from Employee e group by e.department.name order by e.department.name")
    List<Object[]> getSalarySummaryByDepartment();

    @Query(value = "select * from employee where em_salary > :salary order by em_salary desc", nativeQuery = true)
    List<Employee> findEmployeesWithSalaryAboveNative(@Param("salary") Double salary);

    @Query(value = "select count(*) from employee where em_dp_id = :departmentId", nativeQuery = true)
    long countByDepartmentIdNative(@Param("departmentId") Integer departmentId);
}
