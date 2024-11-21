package com.datn.api.services;

import java.util.List;

import com.datn.api.entity.Districts;
import org.springframework.stereotype.Component;

import com.datn.api.entity.dto.DistrictDto;

@Component
public interface DistrictService extends IService<DistrictDto, Long> {
	// List<DistrictDto> findByProvince(String nameOfProvince);

	List<DistrictDto> findByProvince(Long provinceid);

	List<DistrictDto> findByProvinceName(String nameOfProVince);

	Districts findDistrictById(Long id);
}
