package com.datn.api.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "provinces")
public class Provinces {
	@Id
	@Column(name = "province_id", nullable = false)
	private Long provinceID;

	@Column(name = "name_of_province", nullable = false, length = 30)
	private String nameOfProvince;

	@OneToMany(mappedBy = "provinces")
	@JsonBackReference
	private List<Districts> districts;

}