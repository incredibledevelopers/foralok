package com.ipen.portal.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ipen.portal.model.Concept;

@Repository
public interface ConceptRepository extends MongoRepository<Concept, String> {

	Concept findByConceptTitleAndConceptDescription(String conceptTitle, String conceptDescription);
	
	long countByStatus(String status);
	
	List<Concept> findByUsername(String username);
	
	List<Concept> findByIndustry(String industry);
	
	List<Concept> findByStatus(String status);
}