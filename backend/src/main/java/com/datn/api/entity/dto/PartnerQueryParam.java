package com.datn.api.entity.dto;

import com.datn.api.enums.PartnerStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PartnerQueryParam extends BaseQueryRequest{
    PartnerStatus status;
}
