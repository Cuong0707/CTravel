package com.datn.api.entity.dto;

import lombok.Data;

@Data
public class BaseQueryRequest {
    private int page = 0;
    private int pageSize = 16;
    private String orderBy = "asc";
    private String sortFiled =null;
}
