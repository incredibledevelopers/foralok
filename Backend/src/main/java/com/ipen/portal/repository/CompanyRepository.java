package com.ipen.portal.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ipen.portal.model.Company;

@Repository
public interface CompanyRepository extends MongoRepository<Company, String> {

	Company findByCompanyName(String companyName);
	
	List<Company> findByIndustry(String industry);
	
	List<Company> findByLocation(String location);
	
	List<Company> findByIndustryAndLocation(String industry, String location);
	
	List<Company> findByStatus(String status);
}
