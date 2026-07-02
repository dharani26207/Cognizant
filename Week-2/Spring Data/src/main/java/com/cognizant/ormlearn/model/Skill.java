package com.cognizant.ormlearn.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "skill")
public class Skill {

    @Id
    @Column(name = "sk_id")
    private Integer id;

    @Column(name = "sk_name", nullable = false)
    private String name;

    @ManyToMany(mappedBy = "skills", fetch = FetchType.LAZY)
    private List<Employee> employees = new ArrayList<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    @Override
    public String toString() {
        return "Skill{"
                + "id=" + id
                + ", name='" + name + '\''
                + '}';
    }
}
