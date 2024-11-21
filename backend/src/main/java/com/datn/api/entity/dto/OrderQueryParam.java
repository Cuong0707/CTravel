package com.datn.api.entity.dto;

import com.datn.api.enums.OrderStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderQueryParam extends BaseQueryRequest{
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
}
