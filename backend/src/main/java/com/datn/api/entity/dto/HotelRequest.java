package com.datn.api.entity.dto;

import java.time.LocalDateTime;
import java.time.LocalTime;

import com.datn.api.enums.Breakfast;
import com.datn.api.enums.HotelStatus;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

@Data
public class HotelRequest {
	private Long districtId;
    private String nameOfHotel;
    private String typeOfHotel;
    private String standard;
    private HotelStatus status;
    private Breakfast breakfast;
    private String serviceFee;
    @JsonFormat(pattern = "MM/dd/yyyy HH:mm")
    private LocalTime checkIn;
    @JsonFormat(pattern = "MM/dd/yyyy HH:mm")
    private LocalTime checkOut;
	private String address;
    private String description;
    private String childrenPolicies;
    private String termAndPolicies;
}
