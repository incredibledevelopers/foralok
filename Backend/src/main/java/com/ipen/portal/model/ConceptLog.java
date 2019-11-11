package com.ipen.portal.model;

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

@Document(collection = "conceptLogs")
@TypeAlias("conceptLog")
public class ConceptLog {

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getEnteredBy() {
		return enteredBy;
	}

	public void setEnteredBy(String enteredBy) {
		this.enteredBy = enteredBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	@Id
    public String id;
	
	@Field("comments")
	@NotEmpty(message = "Comments must not be empty")
	private String comments;
	
	@Field("entered_by")
	private String enteredBy;
	
	@Field("created_date")
	private Date createdDate;
	
	@Override
	public String toString() {	
		return "Conceptlog: [comments= " + comments + ", enteredBy= " + enteredBy + "]";
	}
}
