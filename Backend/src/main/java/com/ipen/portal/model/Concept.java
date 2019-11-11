package com.ipen.portal.model;

import java.util.Comparator;
import java.util.Date;
import java.util.Set;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.ipen.portal.model.ConceptLog;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Document(collection = "concepts")
@TypeAlias("concept")
public class Concept {
	
	public static class IdComparator implements Comparator<Concept>
	{
	    public int compare(Concept p1, Concept p2)
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
	
	@Field("username")
	//@NotEmpty(message = "Username name must not be empty.")
	private String username;
	
	@Field("concept_title")
	@NotEmpty(message = "Title must not be empty")
	private String conceptTitle;
	
	@Field("industry")
	@NotEmpty(message = "Industry must not be empty")
	private String industry;
	
	@Field("concept_description")
	@NotEmpty(message = "Description must not be empty")
	@Size(min = 500, message = "Message must be more than 500 characters")
	private String conceptDescription;
	
	@Field("concept_lead_drop")
	private String conceptLeadOrDrop = "Lead";
	
	@Field("status")
	private String status = "N";
	
	@Field("created_date")
	private Date createdDate;

	@Field("last_modified_date")
	private Date lastModifiedDate;
	
	private Set<ConceptLog> conceptLogs;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getConceptTitle() {
		return conceptTitle;
	}

	public void setConceptTitle(String conceptTitle) {
		this.conceptTitle = conceptTitle;
	}

	public String getIndustry() {
		return industry;
	}

	public void setIndustry(String industry) {
		this.industry = industry;
	}

	public String getConceptDescription() {
		return conceptDescription;
	}

	public void setConceptDescription(String conceptDescription) {
		this.conceptDescription = conceptDescription;
	}

	public String getConceptLeadOrDrop() {
		return conceptLeadOrDrop;
	}

	public void setConceptLeadOrDrop(String conceptLeadOrDrop) {
		this.conceptLeadOrDrop = conceptLeadOrDrop;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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

	public Set<ConceptLog> getConceptLogs() {
		return conceptLogs;
	}

	public void setConceptLogs(Set<ConceptLog> conceptLogs) {
		this.conceptLogs = conceptLogs;
	}

	@Override
	public String toString() {
		return "Concept: [id = " + id + ", username = " + username + ", title = " + conceptTitle + ", industry = " + industry + ", desc = " + conceptDescription + "]";
	}
}