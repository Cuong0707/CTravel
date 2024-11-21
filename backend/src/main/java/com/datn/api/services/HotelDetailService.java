package com.datn.api.services;

import org.springframework.stereotype.Service;

import com.datn.api.entity.HotelDetails;
import com.datn.api.entity.dto.HotelDetailDto;
import com.datn.api.entity.dto.HotelDetailResponse;
import com.datn.api.entity.dto.HotelDetailsRequest;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface HotelDetailService {

    HotelDetails createHotelsDetail(HotelDetailsRequest hotelDetailsRequest);


    HotelDetails updateHotelsDetail(HotelDetailsRequest hotelDetailsRequest, Long id);

    HotelDetailResponse getAllHotelDetail(Integer pageNumber, Integer pageSize, String sortDir, String sortBy);


    HotelDetails findHotelDetailById(Long id);

    boolean deleteHotelDetail(Long id);

    HotelDetails updatePhotoOfRoom(Long id, MultipartFile file);
}
