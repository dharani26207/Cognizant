package com.cognizant.ormlearn.service;

import java.time.LocalDate;

import com.cognizant.ormlearn.model.Department;
import com.cognizant.ormlearn.model.Employee;
import com.cognizant.ormlearn.model.Project;
import com.cognizant.ormlearn.repository.DepartmentRepository;
import com.cognizant.ormlearn.repository.EmployeeRepository;
import com.cognizant.ormlearn.repository.ProjectRepository;
import com.cognizant.ormlearn.repository.SkillRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeeDemoService {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmployeeDemoService.class);

    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;

    public EmployeeDemoService(
            DepartmentRepository departmentRepository,
            EmployeeRepository employeeRepository,
            ProjectRepository projectRepository,
            SkillRepository skillRepository) {
        this.departmentRepository = departmentRepository;
        this.employeeRepository = employeeRepository;
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
    }

    @Transactional(readOnly = true)
    public void runQueryMethodDemo() {
        LOGGER.info("Query Methods - search by containing text");
        LOGGER.debug("Employees containing 'an': {}", employeeRepository.findByNameContainingIgnoreCase("an"));

        LOGGER.info("Query Methods - filter with starting text");
        LOGGER.debug("Employees starting with 'A': {}", employeeRepository.findByNameStartingWithIgnoreCase("A"));

        LOGGER.info("Query Methods - fetch between dates");
        LOGGER.debug("Employees joined between 2020 and 2022: {}",
                employeeRepository.findByJoiningDateBetween(
                        LocalDate.of(2020, 1, 1),
                        LocalDate.of(2022, 12, 31)));

        LOGGER.info("Query Methods - greater than");
        LOGGER.debug("Employees with salary greater than 70000: {}", employeeRepository.findBySalaryGreaterThan(70000.0));

        LOGGER.info("Query Methods - lesser than");
        LOGGER.debug("Employees with salary less than 60000: {}", employeeRepository.findBySalaryLessThan(60000.0));

        LOGGER.info("Query Methods - top");
        LOGGER.debug("Top 3 employees by salary: {}", employeeRepository.findTop3ByOrderBySalaryDesc());

        LOGGER.info("Query Methods - sorting");
        LOGGER.debug("Technology employees sorted by salary ascending: {}",
                employeeRepository.findByDepartmentName("Technology", Sort.by("salary").ascending()));
    }

    @Transactional(readOnly = true)
    public void runOrmMappingDemo() {
        LOGGER.info("O/R Mapping - @OneToMany mappedBy with FetchType.LAZY");
        Department department = departmentRepository.findById(1).orElseThrow(IllegalStateException::new);
        LOGGER.debug("Department: {}", department);
        LOGGER.debug("Lazy employees for department: {}", department.getEmployees());

        LOGGER.info("O/R Mapping - @ManyToOne with @JoinColumn and FetchType.EAGER");
        Employee employee = employeeRepository.findById(101).orElseThrow(IllegalStateException::new);
        LOGGER.debug("Employee with eager department: {}", employee);

        LOGGER.info("O/R Mapping - @ManyToMany with @JoinTable and mappedBy");
        LOGGER.debug("Lazy skills for employee: {}", employee.getSkills());

        Project project = projectRepository.findById(301).orElseThrow(IllegalStateException::new);
        LOGGER.debug("Project with mappedBy employees: {}", project.getEmployees());
        LOGGER.debug("All available skills: {}", skillRepository.findAll());
    }

    @Transactional(readOnly = true)
    public void runHqlAndNativeQueryDemo() {
        LOGGER.info("@Query with JPQL/HQL - entity names and properties");
        LOGGER.debug("Technology employees earning at least 70000: {}",
                employeeRepository.findHighEarnersByDepartment("Technology", 70000.0));

        LOGGER.info("HQL fetch keyword - fetch lazy skills in the same query");
        employeeRepository.findByIdWithSkills(101)
                .ifPresent(employee -> LOGGER.debug("Employee with fetched skills: {}, skills={}",
                        employee,
                        employee.getSkills()));

        LOGGER.info("Aggregate functions in HQL/JPQL");
        for (Object[] row : employeeRepository.getSalarySummaryByDepartment()) {
            LOGGER.debug("Department={}, count={}, avgSalary={}, maxSalary={}, minSalary={}",
                    row[0],
                    row[1],
                    row[2],
                    row[3],
                    row[4]);
        }

        LOGGER.info("Native query - table and column names with nativeQuery=true");
        LOGGER.debug("Employees with native SQL salary filter: {}",
                employeeRepository.findEmployeesWithSalaryAboveNative(70000.0));
        LOGGER.debug("Native SQL employee count for Technology department: {}",
                employeeRepository.countByDepartmentIdNative(1));
    }
}
