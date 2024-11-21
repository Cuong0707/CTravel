package com.datn.api.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "districts")
public class Districts {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "district_id", nullable = false)
	private Long districtID;

	@Column(name = "name_of_district", nullable = false, length = 30)
	private String nameOfDistrict;

	@ManyToOne
	@JoinColumn(name = "province_id")
	@JsonManagedReference
	private Provinces provinces;

	@OneToMany(mappedBy = "districts", fetch = FetchType.LAZY)
	@JsonManagedReference
	List<Users> users;
	
	@OneToMany(mappedBy = "districts")
	@JsonBackReference
	private List<Hotels> hotels;
}
