# orm-learn

Spring Data JPA hands-on project for query methods and O/R mapping.

## What This Project Demonstrates

- Query method search by containing text:
  `findByNameContainingIgnoreCase`
- Query method filtering by starting text:
  `findByNameStartingWithIgnoreCase`
- Query method date range:
  `findByJoiningDateBetween`
- Query method greater than / lesser than:
  `findBySalaryGreaterThan`, `findBySalaryLessThan`
- Query method top records:
  `findTop3ByOrderBySalaryDesc`
- Query method sorting:
  `findByDepartmentName(String departmentName, Sort sort)`
- O/R mapping:
  `@ManyToOne`, `@JoinColumn`, `@OneToMany`, `mappedBy`, `FetchType.EAGER`, `FetchType.LAZY`, `@ManyToMany`, `@JoinTable`
- `@Query` with JPQL/HQL-style entity queries:
  `findHighEarnersByDepartment`
- HQL `fetch` keyword:
  `findByIdWithSkills`
- Aggregate functions in HQL/JPQL:
  `count`, `avg`, `max`, `min`
- Native SQL queries with `nativeQuery = true`:
  `findEmployeesWithSalaryAboveNative`, `countByDepartmentIdNative`

## HQL, JPQL, and Native Query Notes

- HQL stands for Hibernate Query Language. It is Hibernate's object-oriented query language.
- JPQL stands for Java Persistence Query Language. It is the JPA standard query language.
- JPQL is portable across JPA providers. HQL is Hibernate-specific and supports JPQL plus Hibernate extensions.
- Spring Data JPA `@Query` uses JPQL/HQL-style entity queries by default. These queries use entity class names and Java property names, such as `Employee` and `department.name`.
- A native query uses database table and column names, such as `employee`, `em_salary`, and `em_dp_id`. Set `nativeQuery = true` on `@Query` for native SQL.

## Important Files

- `src/main/java/com/cognizant/ormlearn/model`
  contains `Country`, `Department`, `Employee`, `Skill`, and `Project` entities.
- `src/main/java/com/cognizant/ormlearn/repository/EmployeeRepository.java`
  contains the Spring Data JPA query methods, JPQL/HQL queries, fetch query, aggregate query, and native SQL queries.
- `src/main/java/com/cognizant/ormlearn/service/EmployeeDemoService.java`
  runs the query method, mapping, HQL/JPQL, and native query demonstrations.
- `src/main/resources/schema.sql`
  creates and inserts sample data for all tables.

## Database Setup

Run the SQL in `src/main/resources/schema.sql` in MySQL before starting the app.

The application currently expects:

- Database: `ormlearn`
- Username: `root`
- Password: `1234`
- URL: `jdbc:mysql://localhost:3306/ormlearn`

Update `src/main/resources/application.properties` if your local MySQL credentials are different.

## Run

```powershell
mvn spring-boot:run
```

On startup, `OrmLearnApplication` logs the original country examples and then runs the employee query method, relationship mapping, HQL/JPQL, and native query demonstrations.
