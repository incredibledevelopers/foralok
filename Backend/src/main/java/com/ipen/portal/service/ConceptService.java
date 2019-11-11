package com.ipen.portal.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ipen.portal.model.Concept;
import com.ipen.portal.repository.ConceptRepository;

@Service
public class ConceptService implements IConceptService {

	@Autowired
	private ConceptRepository conceptRepository;
	
	@Autowired
	private NextSequenceService nextSequenceService;
	
	@Override
	public Concept getConceptById(String id) {
		return conceptRepository.findById(id).get();
	}

	@Override
	public boolean conceptExists(String conceptTitle, String conceptDescription) {
		Concept concept = conceptRepository.findByConceptTitleAndConceptDescription(conceptTitle, conceptDescription);
		
		if (concept == null)
			return false;
		else
			return true;
	}

	@Override
	public long countConcepts(String status) {
		return conceptRepository.countByStatus(status);
	}

	@Override
	public Concept addConcept(Concept concept) {
		concept.setId(nextSequenceService.getNextSequence("customSequences"));
		concept.setStatus("N");
		concept.setCreatedDate(new Date());
		return conceptRepository.save(concept);
	}

	@Override
	public Concept updateConcept(Concept concept) {
		concept.setLastModifiedDate(new Date());
		return conceptRepository.save(concept);
	}

	@Override
	public List<Concept> getAllConcepts() {
		List<Concept> list = new ArrayList<Concept>();
		conceptRepository.findAll().forEach(list :: add);
		Collections.sort(list, Collections.reverseOrder(new Concept.IdComparator()));
		return list;
	}

	@Override
	public List<Concept> getConceptsByUsername(String username) {
		List<Concept> list = new ArrayList<Concept>();
		conceptRepository.findByUsername(username).forEach(list :: add);
		Collections.sort(list, Collections.reverseOrder(new Concept.IdComparator()));
		return list;
	}

	@Override
	public List<Concept> getConceptsByIndustry(String industry) {
		List<Concept> list = new ArrayList<Concept>();
		conceptRepository.findByIndustry(industry).forEach(list :: add);
		
		return list;
	}

	@Override
	public List<Concept> getConceptsByStatus(String status) {
		List<Concept> list = new ArrayList<Concept>();
		conceptRepository.findByStatus(status).forEach(list :: add);
		
		return list;
	}
}
