package com.datn.api.entity;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import com.datn.api.enums.Breakfast;
import com.datn.api.enums.HotelStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "hotels")
public class Hotels {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "hotel_id", nullable = false)
	private Long hotel_ID;

	@ManyToOne
	@JoinColumn(name = "partner_id")
	@JsonBackReference
	private Partners partner;

	@ManyToOne
	@JoinColumn(name = "district_id")
	@JsonBackReference
	private Districts districts;

	@Column(name = "name_of_hotel", nullable = false, length = 50)
	private String nameOfHotel;

	@Column(name = "type_of_hotel", nullable = false, length = 50)
	private String typeOfHotel;

	@Column(name = "standard", nullable = true, length = 5)
	private String standard;

	@Column(name = "status", nullable = true)
	@Enumerated(EnumType.STRING)
	private HotelStatus status;

	@Column(name = "breakfast", nullable = true)
	@Enumerated(EnumType.STRING)
	private Breakfast breakfast;

	@Column(name = "service_fee", nullable = true, length = 5)
	private String serviceFee;

	@Column(name = "check_in", nullable = true)
	private LocalTime checkIn;

	@Column(name = "check_out", nullable = true)
	private LocalTime checkOut;

	@Column(name = "address", nullable = false)
	private String address;

	@Column(name = "description", nullable = true)
	private String description;

	@Column(name = "children_policies", nullable = true)
	private String childrenPolicies;

	@Column(name = "term_and_policies", nullable = true)
	private String termAndPolicies;

	@Column(name = "View", nullable = false)
	private Long view;

	@Column(name = "is_Delete", nullable = false)
	private boolean isDelete;

	@OneToMany(mappedBy = "hotels")
	@JsonManagedReference
	List<HotelDetails> hotelDetails;

	@OneToMany(mappedBy = "hotels")
	@JsonManagedReference
	List<PhotosOfHotel> photosOfHotels;


}
