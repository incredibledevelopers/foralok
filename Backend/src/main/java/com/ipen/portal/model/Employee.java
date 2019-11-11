package com.ipen.portal.model;

import java.util.Comparator;
import java.util.Date;
import javax.validation.constraints.NotEmpty;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Document(collection = "employees")
@TypeAlias("employee")
public class Employee {
	
	public static class IdComparator implements Comparator<Employee>
	{
	    public int compare(Employee p1, Employee p2)
	    {
	        int id1 = Integer.parseInt(p1.getId());
	        int id2 = Integer.parseInt(p2.getId());

	        if (id1 == id2)
	            return 0;
	        else if (id1 > id2)
	            return 1;
	        else
	            return -1;
	    }
	}

	@Id
    public String id;
	
	@Field("profile_id")
	@NotEmpty(message = "Service provider profile Id must not be empty")
	private Long profileId;
	
	private String username;
	@Field("id")
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Long getProfileId() {
		return profileId;
	}

	public void setProfileId(Long profileId) {
		this.profileId = profileId;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public Float getSalary() {
		return salary;
	}

	public void setSalary(Float salary) {
		this.salary = salary;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Float getStockUnits() {
		return stockUnits;
	}

	public void setStockUnits(Float stockUnits) {
		this.stockUnits = stockUnits;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}

	private String designation;
	private String department;
	private Float salary;
	private String remarks;
	private String status;
	
	@Field("stock_units")
	private Float stockUnits;
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Field("created_date")
	private Date createdDate;

	@Field("last_modified_date")
	private Date lastModifiedDate;
	
	@Override
    public String toString() {
        return "Employee: [profileId =" + profileId + ", username = " + username + "designation = " + designation + ", remarks=" + remarks + ", department= " + department + ", salary= " + salary +", stockUnits= " + stockUnits + "]";
    }
}