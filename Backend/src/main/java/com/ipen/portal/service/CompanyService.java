package com.ipen.portal.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ipen.portal.model.Company;
import com.ipen.portal.repository.CompanyRepository;

@Service
public class CompanyService implements ICompanyService {

	@Autowired
	private CompanyRepository companyRepository;
	
	@Autowired
	private NextSequenceService nextSequenceService;
	
	@Override
	public Company getCompanyById(String companyCode) {
		return companyRepository.findById(companyCode).get();
	}
	
	@Override
	public List<Company> getAllCompanies() {
		List<Company> list = new ArrayList<Company>();
		companyRepository.findAll().forEach(list::add);
		Collections.sort(list, Collections.reverseOrder(new Company.IdComparator()));
		return list;
	}

	@Override
	public List<Company> getCompaniesByIndustry(String industry) {
		List<Company> list = new ArrayList<Company>();
		companyRepository.findByIndustry(industry).forEach(list::add);
		return list;
	}
	
	@Override
	public List<Company> getCompaniesByLocation(String location) {
		List<Company> list = new ArrayList<Company>();
		companyRepository.findByLocation(location).forEach(list::add);
		return list;
	}

	@Override
	public List<Company> getCompaniesByIndustryAndLocation(String industry, String location) {
		List<Company> list = new ArrayList<Company>();
		companyRepository.findByIndustryAndLocation(industry, location).forEach(list::add);
		return list;
	}
	
	@Override
	public List<Company> getCompaniesByStatus(String status) {
		List<Company> list = new ArrayList<Company>();
		companyRepository.findByStatus(status).forEach(list::add);
		return list;
	}

	@Override
	public Company addCompany(Company company) {
		company.setId(nextSequenceService.getNextSequence("customSequences"));
		company.setCreatedDate(new Date());
		company.setStatus("N");
		return companyRepository.save(company);
	}

	@Override
	public Company updateCompany(Company company) {
		return companyRepository.save(company);
	}

	@Override
	public boolean companyExist(String companyName) {
		Company company = companyRepository.findByCompanyName(companyName);
		if (company == null)
			return false;
		else
			return true;
	}

}
