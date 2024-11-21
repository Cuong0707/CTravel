package com.datn.api.entity.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PhotosOfHotelsRequest {
    private String nameOfPhoto;
    private Long hotelId;
}
