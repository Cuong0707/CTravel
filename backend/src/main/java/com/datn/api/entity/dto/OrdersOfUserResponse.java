package com.datn.api.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdersOfUserResponse {
	private OrderDto order;
	private String hotelName;
	private String hotelAddress;
	private String service;
}