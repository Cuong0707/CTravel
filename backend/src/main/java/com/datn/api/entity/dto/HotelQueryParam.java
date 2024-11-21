package com.datn.api.entity.dto;

import lombok.Builder;
import lombok.Data;


@Builder
@Data
public class HotelQueryParam extends BaseQueryRequest{
	private Long provinceId;
    private String standard ;
    private String keyword ;
}
