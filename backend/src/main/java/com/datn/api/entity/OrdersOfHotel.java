package com.datn.api.entity;

import java.time.LocalDateTime;

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
@Table(name = "orders_of_hotel")
public class OrdersOfHotel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "order_hotel_id", nullable = false)
	private Long orderHotelID;

	@Column(name = "amount_of_room", nullable = false, columnDefinition = "int default 1")
	private Integer amountOfRoom;

	@Column(name = "number_of_people", nullable = false)
	private Integer numberOfPeople;

	@Column(name = "number_of_children", nullable = true)
	private Integer numberOfChildren;

	@Column(name = "check_in_date", nullable = false)
	private LocalDateTime checkInDate;

	@Column(name = "length_of_stay", nullable = false, columnDefinition = "int default 1")
	private Integer lengthOfStay;

	@Column(name = "original_price", nullable = false)
	private Double originalPrice;

	@Column(name = "promotion_price", nullable = true)
	private Double promotionPrice;

	@ManyToOne
	@JoinColumn(name = "order_id")
	@JsonBackReference
	private Orders orders;

	@ManyToOne
	@JoinColumn(name = "hotel_detail_id")
	@JsonBackReference
	private HotelDetails hotelDetails;
}
