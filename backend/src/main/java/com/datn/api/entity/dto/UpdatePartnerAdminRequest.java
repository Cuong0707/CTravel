package com.datn.api.entity.dto;

import com.datn.api.enums.PartnerStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
public class UpdatePartnerAdminRequest {
    @Enumerated(EnumType.STRING)
    private PartnerStatus status;
}
