package com.datn.api.entity.dto;

import com.datn.api.enums.PartnerStatus;
import com.datn.api.enums.UserStatus;
import lombok.Data;

@Data
public class PartnerRequest {
    private String partnerId;
    private String userId;
    private String serviceId;
    private String email;
    private String nameOfCompany;
    private String avatar;
    private String taxCode;
    private String avatarOfCompany;
    private String businessLicense;
    private String website;
    private PartnerStatus status;
}
