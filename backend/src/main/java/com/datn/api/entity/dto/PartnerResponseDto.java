package com.datn.api.entity.dto;

import lombok.Data;

import java.util.List;
@Data
public class PartnerResponseDto {
    private List<PartnersDto> content;
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean lastPage;
}
