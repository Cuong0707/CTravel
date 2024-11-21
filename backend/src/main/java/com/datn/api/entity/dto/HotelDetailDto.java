package com.datn.api.entity.dto;

import lombok.Data;

@Data
public class HotelDetailDto {
    private Long hotelDetailId;
    private String typeOfRoom;
    private String areaOfRoom;
    private int amountOfRoom;
    private String typeOfBed;
    private String sizeOfBed;
    private String highlights;
    private String priceOfRoom;
    private String photosOfRoom;
    private Long hotelId;
}
