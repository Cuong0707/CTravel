package com.datn.api.entity.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PartnerV2Request {
    PartnerRequest partnerRequest;
    HotelRequest hotelRequest;
    List<HotelDetailsRequest> lsHotelDetailsRequests;
}
