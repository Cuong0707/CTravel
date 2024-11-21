package com.datn.api.entity.dto;

import java.util.List;

import lombok.Data;

@Data
public class OrderRequest {
    private Long orderId;
    private String partnerId;
    private String paymentMethod;
    private String orderStatus;
    private List<OrdersOfHotelDto> ordersOfHotels;

}
