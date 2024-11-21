package com.datn.api.entity.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;
@Data
public class OrderDto {
    private Long orderID;
    private String partnerID;
    private String userID;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime orderDate;
    private String paymentMethod;
    private String status;
    private Double totalPrice;
    private List<OrdersOfHotelDto> ordersOfHotels;
}
