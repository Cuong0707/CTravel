package com.datn.api.entity.dto;

import com.datn.api.enums.OrderStatus;
import lombok.Data;

@Data
public class UpdateOrderRequest {
    String status;
}
