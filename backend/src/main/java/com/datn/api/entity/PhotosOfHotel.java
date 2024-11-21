package com.datn.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "photos_of_hotel")
public class PhotosOfHotel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "photos_of_hotel_id", nullable = false)
	private Long photosOfHotelID;

	@Column(name = "name_of_photo", nullable = false, length = 50)
	private String nameOfPhoto;

	@Column(name = "image", nullable = false, length = 50)
	private String image;

	@ManyToOne
	@JoinColumn(name = "hotel_id")
	@JsonBackReference
	private Hotels hotels;
}
