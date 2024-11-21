package com.datn.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.datn.api.entity.dto.DistrictDto;
import com.datn.api.exceptions.ApiResponse;
import com.datn.api.repository.DistrictRepository;
import com.datn.api.services.DistrictServiceImpl;

@RestController
@RequestMapping("/api/v1/districts")
public class DistrictController {
	@Autowired
	private DistrictRepository districtRepository;

	@Autowired
	private DistrictServiceImpl districtService;

	@GetMapping("/{provinceID}")
	public ApiResponse<List<DistrictDto>> findDistrictByProvince(@PathVariable("provinceID") Long provinceID) {
		List<DistrictDto> district = districtService.findByProvince(provinceID);
		return ApiResponse.success(HttpStatus.OK, "success", district);
	}

	@GetMapping("/search")
	public ApiResponse<List<DistrictDto>> findDistrictByProvinceName(
			@RequestParam(value = "q", defaultValue = "", required = false) String keywords) {
		List<DistrictDto> district = districtService.findByProvinceName(keywords);
		return ApiResponse.success(HttpStatus.OK, "success", district);
	}

	@GetMapping("")
	public ApiResponse<List<DistrictDto>> findDistrictByProvince()
	{
		List<DistrictDto> district = districtService.findAll();

		return ApiResponse.success(HttpStatus.OK, "success", district);
	}

}
