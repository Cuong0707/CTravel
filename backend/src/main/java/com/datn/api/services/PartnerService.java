package com.datn.api.services;

import com.datn.api.entity.Users;
import com.datn.api.entity.dto.*;
import org.springframework.stereotype.Service;

import com.datn.api.entity.Partners;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface PartnerService {

    PartnerResponseDto getAllPartners(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);

    Partners findPartnerById(String id);

    Partners create(PartnerRequest partnerRequest, MultipartFile image, MultipartFile license);
    boolean createV2(PartnerV2Request partnerV2Request, MultipartFile image, MultipartFile license, MultipartFile[] lsHotelDetailImages);

    Partners updateForAdmin(String id,UpdatePartnerAdminRequest updatePartnerAdminRequest);

    boolean checkPartner(Long hotelId);

    Partners findPartnerByUser(Users user);

    PartnerResponseDto filterPartner(PartnerQueryParam partnerQueryParam);
}
