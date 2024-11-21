package com.datn.api.services;

import java.util.List;

import org.springframework.stereotype.Component;

import com.datn.api.entity.Hotels;
import com.datn.api.entity.dto.HotelDto;
import com.datn.api.entity.dto.HotelQueryParam;
import com.datn.api.entity.dto.HotelRequest;
import com.datn.api.entity.dto.HotelResponseDto;
import com.datn.api.exceptions.Exception;

@Component
public interface HotelService extends IService<HotelDto, Long> {

    HotelResponseDto findByProvinces(Long id, Integer pageNumber, Integer pageSize);


	HotelDto findByPartner(String id);

	HotelResponseDto getAllHotels(Integer pageNumber, Integer pageSize, String sortDir, String sortBy, Long id);

    List<HotelDto> findAllHotelsByProvince(String provinceID);

	Integer sumHotelsViewOfUser(String id);

	Integer numberOrderOfHotel(String id);

    Hotels create(HotelRequest hotelRequest) throws Exception;


    Hotels update(HotelRequest hotelRequest, Long id) throws Exception;

    HotelResponseDto findByKeywords(Integer pageNumber, Integer pageSize, String keywords);

	boolean deleteHotel(Long id);

    HotelDto updateView(Long id);

    Hotels findHotelById(Long id);

    HotelResponseDto filterHotel(HotelQueryParam hotelQueryParam);
}
