package com.ipen.portal.service;

import java.util.List;

import com.ipen.portal.model.Company;

public interface ICompanyService {

	Company getCompanyById(String companyCode);
	
	List<Company> getAllCompanies();

	List<Company> getCompaniesByIndustry(String industry);
	
	List<Company> getCompaniesByLocation(String location);

	List<Company> getCompaniesByIndustryAndLocation(String industry, String location);
	
	List<Company> getCompaniesByStatus(String status);

	Company addCompany(Company company);

	Company updateCompany(Company company);

	boolean companyExist(String companyName);
}
