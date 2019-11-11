package com.ipen.portal.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ipen.portal.model.Concept;
import com.ipen.portal.model.ConceptLog;
import com.ipen.portal.service.IConceptService;

@RestController
@RequestMapping("/concept/")
public class ConceptController {

	public static final Logger logger = LoggerFactory.getLogger(ConceptController.class);
	
	@Autowired
	private IConceptService conceptService;
	
	//Services for Concepts -- Start
	
	@PostMapping("add")
    public Concept addConcept(@RequestBody Concept concept){
		logger.info("Add Concept : {}", concept);
        return conceptService.addConcept(concept);
    }
	
	@PutMapping("update/{id}")
    public Concept updateConcept(@PathVariable(value= "id") String id,@RequestBody Concept concept){
		logger.info("Update Concept : {}", concept);
		concept.setId(id);
		Concept currentConcept = conceptService.getConceptById(id);
		Set<ConceptLog> conceptLogSet = currentConcept.getConceptLogs();
		concept.setConceptLogs(conceptLogSet);
        return conceptService.updateConcept(concept);
    }
	
	@GetMapping("concepts/{username}")
    public List<Concept> getConceptsByUsername(@PathVariable("username") String username) {
		logger.info("Fetching Concepts for :"+username);
        return conceptService.getConceptsByUsername(username);
    }
	
	@GetMapping("concept/{id}")
    public Concept getConceptById(@PathVariable("id") String id) {
		logger.info("Fetching Concept by id");
        return conceptService.getConceptById(id);
    }

	@GetMapping("list")
    public List<Concept> getAllConcepts() {
		logger.info("Fetching All Concepts");
        return conceptService.getAllConcepts();
    }
	
	@GetMapping("list/{option}/{param}")
    public List<Concept> getConceptByStatus(@PathVariable("option") String option, @PathVariable("param") String param) {
		logger.info("Fetching Concepts by " + option);
		
		if (option.equals("status")) {
			return conceptService.getConceptsByStatus(param);
		} else if (option.equals("industry")) {
			return  conceptService.getConceptsByIndustry(param);
		} else if (option.equals("username")) {
			return conceptService.getConceptsByUsername(param);
		}
	return null;	
    }
	
	//Services for Concepts -- End
	
	//Services for Concept Logs-- Start
	
	@PostMapping("add/log/{id}/{username}")
    public Concept addConceptLog(@RequestBody ConceptLog conceptLog, @PathVariable(value= "id") String conceptId, @PathVariable("username") String username) {
		logger.info("Add ConceptLog : {}", conceptLog);
		conceptLog.setEnteredBy(username);
        Concept concept = conceptService.getConceptById(conceptId); 
		Set<ConceptLog> conceptLogSet = concept.getConceptLogs();
	
		if (conceptLogSet == null)
			conceptLogSet = new HashSet<ConceptLog>();
		
		conceptLogSet.add(conceptLog);
		concept.setConceptLogs(conceptLogSet);
        return conceptService.updateConcept(concept);
    }
	
	@GetMapping("concept/{id}/log")
    public Set<ConceptLog> getConceptByLog(@PathVariable("id") String id) {
		logger.info("Fetching ConceptLog by id");
		Concept concept = conceptService.getConceptById(id);
        return concept.getConceptLogs();
    }
	
	//Services for Concept Logs-- End
	
}