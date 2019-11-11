package com.ipen.portal.controller;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ipen.portal.model.Company;
import com.ipen.portal.model.Employee;
import com.ipen.portal.service.ICompanyService;
import com.ipen.portal.service.NextSequenceService;

@RestController
@RequestMapping("/company/")
public class CompanyController {

	public static final Logger logger = LoggerFactory.getLogger(CompanyController.class);
	
	@Autowired
	private ICompanyService companyService;
	
	@Autowired
	private NextSequenceService nextSequenceService;
	
	@PostMapping("add")
    public @ResponseBody Company addCompany(@RequestBody Company company) {
		logger.info("Add Company : {}", company);
		boolean exists = companyService.companyExist(company.getCompanyName());
		if (exists == true) {
			logger.error("Unable to add. A Company with company name {} already exist", company.getCompanyName());
			return null;
		}
		else {
        return companyService.addCompany(company);
		}
    }
	
	@PostMapping("update/{id}")
    public @ResponseBody Company updateCompany(@PathVariable("id") String id, @RequestBody Company company) {
		logger.info("Update Company : {}", company);
		
        Company currenctCompany = companyService.getCompanyById(id);
		if (currenctCompany == null) {
			logger.error("Unable to update. A Company with company code {} not found", company.getId());
			return null;
		}
		Set<Employee> employees = currenctCompany.getEmployees();
		company.setEmployees(employees);
		company.setId(id);
       return  companyService.updateCompany(company);
    }
	
	@GetMapping("company/{id}")
    public Company getCompanyById(@PathVariable("id") String id) {
		logger.info("Fetching Company by id");
        return companyService.getCompanyById(id);
    }
	
	@GetMapping("list")
    public List<Company> getAllCompanies() {
		logger.info("Fetching All Companies");
        return companyService.getAllCompanies();
    }
	
	
	@PostMapping("addemployee/{id}")
    public Company addEmployee(@PathVariable("id") String id, @RequestBody Employee employee) {
		employee.setId(nextSequenceService.getNextSequence("customSequences"));
		logger.info("Add Employee : {}", employee);
        Company company = companyService.getCompanyById(id);
		Set<Employee> empSet = company.getEmployees();
		if (empSet == null)
			empSet = new HashSet<Employee>();
		company.setId(id);
		empSet.add(employee);
		company.setEmployees(empSet);
        return companyService.updateCompany(company);
    }
	
	@GetMapping("company/{companyid}/{empid}")
    public Employee getEmployeeById(@PathVariable("companyid") String companyid,@PathVariable("empid") String empid) {
		logger.info("Fetching Company employee by id");
		 Company company = companyService.getCompanyById(companyid);
		 Set<Employee> empSet = company.getEmployees();
		 Iterator<Employee> iterator = empSet.iterator();
			while (iterator.hasNext()) {
			    Employee emp = iterator.next();
			    if (emp.getId().equals(empid)) {
			    	System.out.println(emp.getUsername());
			    	return emp;
			    }
			}
        return null;
    }
	
	@PutMapping("updateemployee/{companyid}/{empid}")
    public Company updateEmployee(@PathVariable("companyid") String companyid,@PathVariable("empid") String empid, @RequestBody Employee employee) {
		logger.info("Update Employee : {}", employee);
        Company company = companyService.getCompanyById(companyid);
		Set<Employee> empSet = company.getEmployees();
		Iterator<Employee> iterator = empSet.iterator();
		while (iterator.hasNext()) {
		    Employee emp = iterator.next();
		    if (emp.getId().equals(empid)) {
		        iterator.remove();
		    }
		}
		company.setId(companyid);
		empSet.add(employee);
		company.setEmployees(empSet);
        return companyService.updateCompany(company);
    }
	
	@GetMapping("company/{id}/employee")
	public List<Employee> showCompanyByEmployee(@PathVariable("id") String id, Model model) {
		logger.info("Fetching Employees by company id");
		Company company = companyService.getCompanyById(id);
		Set<Employee> employees = company.getEmployees();
		if (employees != null) {
			List<Employee> list = convertSetToList(employees);
			Collections.sort(list, Collections.reverseOrder(new Employee.IdComparator()));
			return list;
		} else
			return null;
	}

    public static <T> List<T> convertSetToList(Set<T> set) 
    { 
        List<T> list = new ArrayList<>(set); 
        return list; 
    } 
	
	
	@GetMapping("list/employees")
    public Set<Employee> showAllEmployees() {
		logger.info("Fetching All Employees");
		List<Company> company = companyService.getAllCompanies();
        return company.get(0).getEmployees();
    }
	
	@GetMapping("list/{option}/{param}")
    public List<Company> showCompanyByStatus(@PathVariable("option") String option, @PathVariable("param") String param) {
		logger.info("Fetching Companies by " + option);
		
		if (option.equals("status")) {
			 return companyService.getCompaniesByStatus(param);	
		} else if (option.equals("industry")) {
			 return companyService.getCompaniesByIndustry(param);
		} if (option.equals("location")) {
			return companyService.getCompaniesByLocation(param);
		}
        
        return null;
    }
	
	@GetMapping("list/{industry}/{location}")
    public List<Company> showCompanyByIndustryAndLocation(@PathVariable("industry") String industry, @PathVariable("location") String location, Model model) {
		logger.info("Fetching Companies by industry and location");
        return  companyService.getCompaniesByIndustryAndLocation(industry, location);
    }
	

	
}