package com.datn.api.entity.dto;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import com.datn.api.enums.Breakfast;
import com.datn.api.enums.HotelStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class HotelDto {
	private Long hotelId;
	private PartnersDto partner;
	private DistrictDto district;
	private String nameOfHotel;
	private String typeOfHotel;
	private String standard;
	private HotelStatus status;
	private Breakfast breakfast;
	private String serviceFee;
	private LocalTime checkIn;
	private LocalTime checkOut;
	private String address;
	private String description;
	private String childrenPolicies;
	private String termAndPolicies;
	private Long view;
	List<HotelDetailDto> hotelDetails;
	List<PhotosOfHotelsDto> photosOfHotels;
}
