package com.datn.api.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "services")
public class Services {
	@Id
	@Column(name = "service_id", nullable = false, length = 10)
	private String serviceID;

	@Column(name = "service", nullable = false, length = 255)
	private String service;

	@OneToMany(mappedBy = "services", fetch = FetchType.LAZY)
	@JsonManagedReference
	List<Partners> partners;

	public Services(String serviceID, String service) {
		this.serviceID = serviceID;
		this.service = service;
	}

}
