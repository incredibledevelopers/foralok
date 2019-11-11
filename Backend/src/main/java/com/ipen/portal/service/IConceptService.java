package com.ipen.portal.service;

import java.util.List;

import com.ipen.portal.model.Concept;

public interface IConceptService {

	Concept getConceptById(String id);
	
	boolean conceptExists(String conceptTitle, String conceptDescription);
	
	long countConcepts(String status);
	
	Concept addConcept(Concept concept);
	
	Concept updateConcept(Concept concept);
	
	List<Concept> getAllConcepts();
	
	List<Concept> getConceptsByUsername(String username);
	
	List<Concept> getConceptsByIndustry(String industry);
	
	List<Concept> getConceptsByStatus(String status);
}