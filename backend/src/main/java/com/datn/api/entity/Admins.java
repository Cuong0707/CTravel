package com.datn.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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
@Table(name = "admins")
public class Admins {
	@Id
	@Column(name = "admin_id", nullable = false, length = 10)
	private String adminID;

	@Column(name = "name_of_admin", nullable = false, length = 50)
	private String nameOfAdmin;
	
	@Column(name = "is_Delete", nullable = false)
	private boolean isDelete;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id")
	@JsonBackReference
	private Users user;
}
