package com.datn.api.entity.dto;

import com.datn.api.enums.UserStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserQueryParam extends BaseQueryRequest{
    private UserStatus status;
}
