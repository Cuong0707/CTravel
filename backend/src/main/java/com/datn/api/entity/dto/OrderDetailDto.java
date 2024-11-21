package com.datn.api.entity.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
public class OrderDetailDto {
    private Long orderHotelID;
    private int amountOfRoom;
    private int numberOfPeople;
    private int numberOfChildren;
    @DateTimeFormat(pattern = "hh:mma dd/MM/yyyy")
    private LocalDateTime checkInDate;
    private int lengthOfStay;
    private double originalPrice;
    private double promotionPrice;
    private Long orderId;
    private Long hotelDetailId;
}
