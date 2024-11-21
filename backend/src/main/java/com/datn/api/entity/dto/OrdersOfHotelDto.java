package com.datn.api.entity.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class OrdersOfHotelDto {
	private Long orderHotelID;
	private int amountOfRoom;
	private int numberOfPeople;
	private int numberOfChildren;
	private String typeOfRoom;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy HH:mm:ss")
	private LocalDateTime checkInDate;
	private int lengthOfStay;
	private double originalPrice;
	private double promotionPrice;
	private Long orderID;
	private Long hotelDetailId;
}
