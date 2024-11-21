package com.datn.api.entity.dto;

import java.util.List;

import lombok.Data;
@Data
public class OrderResponse {
	private List<OrdersOfUserResponse> content;
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean lastPage;
}
