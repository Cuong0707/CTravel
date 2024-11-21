package com.datn.api.entity.dto;

import com.datn.api.enums.HotelDetailStatus;
import lombok.Data;

@Data
public class HotelDetailsRequest {

    private Long hotelId;

    private String typeOfRoom;

    private String areaOfRoom;

    private int amountOfRoom;

	private String typeOfBed;

	private String sizeOfBed;

    private String highlights;

    private HotelDetailStatus status;

	private double priceOfRoom;

    private String photosOfRoom;
}
