package com.datn.api.entity.dto;

import com.datn.api.enums.UserStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
public class UpdateStatusUserForAdminRequest {
    @Enumerated(EnumType.STRING)
    private UserStatus status;
}
