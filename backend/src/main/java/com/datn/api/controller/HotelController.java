package com.datn.api.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.datn.api.entity.dto.HotelDto;
import com.datn.api.entity.dto.HotelQueryParam;
import com.datn.api.entity.dto.HotelRequest;
import com.datn.api.entity.dto.HotelResponseDto;
import com.datn.api.exceptions.ApiResponse;
import com.datn.api.exceptions.Exception;
import com.datn.api.services.HotelService;

@RestController
@RequestMapping("/api/v1/hotels")
public class HotelController {
	@Autowired
	HotelService hotelService;

	//fixed
	@GetMapping("")
	public ApiResponse<HotelResponseDto> getAllHotels(
            @RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "8", required = false) Integer pageSize,
			@RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir,
			@RequestParam(value = "sortBy", defaultValue = "nameOfHotel", required = false) String sortBy,
			@RequestParam(value = "id", defaultValue = "", required = false) Long id
	){
		return ApiResponse.success(HttpStatus.OK, "success",
				hotelService.getAllHotels(pageNumber, pageSize, sortDir, sortBy, id));
	}
	@GetMapping("/filter/all")
	public ApiResponse<HotelResponseDto> filterHotel(HotelQueryParam hotelQueryParam){
		return ApiResponse.success(HttpStatus.OK, "success",hotelService.filterHotel(hotelQueryParam));
	}
	//fixed
	@PutMapping("/increase-view/{id}")
	public ApiResponse<?> increaseViews(@PathVariable("id") Long id) {
		return ApiResponse.success(HttpStatus.OK, "View đã tăng", hotelService.updateView(id));
	}
	//fixed
	@GetMapping("/{id}")
	public ApiResponse<HotelDto> getHotel(@PathVariable("id") Long id) {
		HotelDto hotel = hotelService.findById(id);
		String successMessage = "Tìm thấy hotel có id " + id;
		return ApiResponse.success(HttpStatus.OK, successMessage, hotel);
	}

	//fixed
	@PostMapping("")
	@PreAuthorize("hasAnyAuthority('partner')")
	public ApiResponse<?> createHotel(@RequestBody HotelRequest hotelRequest ) throws Exception {
		return ApiResponse.success(HttpStatus.OK,"created success",hotelService.create(hotelRequest));
	}
	//fixed
	@PutMapping("/{id}")
	@PreAuthorize("hasAnyAuthority('partner','admin')")
	public ApiResponse<?> updateHotel(@RequestBody HotelRequest hotelRequest, @PathVariable Long id) throws Exception {
		return ApiResponse.success(HttpStatus.OK, "updated success", hotelService.update(hotelRequest, id));
	}
	//fixed
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAnyAuthority('admin')")
	public ApiResponse<?> deleteHotel(@PathVariable("id") Long id) {
		return ApiResponse.success(HttpStatus.OK, "deleted success", hotelService.deleteHotel(id));
	}
	//fixed
	@GetMapping("/search")
	public ApiResponse<HotelResponseDto> search(
			@RequestParam(value = "q", defaultValue = "", required = false) String keywords,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize
	) {
		return ApiResponse.success(HttpStatus.OK, "success",hotelService.findByKeywords(pageNumber, pageSize, keywords));
	}
	//fixed
//	@GetMapping("/provinces/{id}")
//	public ApiResponse<HotelResponseDto> getHotelsProvince(
//			@PathVariable("id") Long id,
//			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
//			@RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize
//	) {
//		return ApiResponse.success(HttpStatus.OK, "success",hotelService.findByProvinces(id,pageNumber, pageSize));
//	}
	//fixed
	@GetMapping("/partners/{id}")
	public ApiResponse<?> listHostelOfPartner(@PathVariable String id) {
		return ApiResponse.success(HttpStatus.OK, "success", hotelService.findByPartner(id));
	}

}
