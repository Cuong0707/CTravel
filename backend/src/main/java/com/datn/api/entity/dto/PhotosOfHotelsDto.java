package com.datn.api.entity.dto;

import lombok.Data;

@Data
public class PhotosOfHotelsDto {
    private Integer photosOfHotelId;
    private String nameOfPhoto;
    private String image;
    private Long hotelId;
}
