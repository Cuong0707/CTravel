package com.datn.api.entity.dto;

import java.util.List;

import lombok.Data;

@Data
public class ProvincesDto {
    private Long provinceId;
    private String nameOfProvince;
	private String featuredImage;
	private List<DistrictDto> district;
}
