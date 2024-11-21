package com.datn.api.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.datn.api.entity.OrdersOfHotel;
import com.datn.api.entity.dto.OrdersOfHotelDto;

@Service
public class OrderOfHotelServiceImpl implements OrderOfHotelService {
    @Autowired
    ModelMapper modelMapper;

	public OrdersOfHotelDto ordersOfHotelDto(OrdersOfHotel ordersOfHotel) {
		OrdersOfHotelDto ordersOfHotelDto = modelMapper.map(ordersOfHotel, OrdersOfHotelDto.class);
		ordersOfHotelDto.setHotelDetailId(ordersOfHotel.getHotelDetails().getHotelDetailID());
		ordersOfHotelDto.setOrderID(ordersOfHotel.getOrders().getOrderID());
		return ordersOfHotelDto;
    }
}
