package com.datn.api.controller;

import com.datn.api.entity.dto.PartnerV2Request;
import com.datn.api.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.datn.api.entity.dto.PartnerRequest;
import com.datn.api.entity.dto.UpdatePartnerAdminRequest;
import com.datn.api.exceptions.ApiResponse;
import com.datn.api.repository.PartnerRepository;
import com.datn.api.services.PartnerService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/partners")
public class PartnerController {
    @Autowired
    PartnerRepository partnerRepository;
    @Autowired
    PartnerService partnerService;
    @Autowired
    UsersService usersService;

    @GetMapping("/{id}")
    public ApiResponse<?> getOnePartner(@PathVariable("id") String id) {
        return ApiResponse.success(HttpStatus.OK, "Success", partnerService.findPartnerById(id));
    }

    @GetMapping("/users/{id}")
    @PreAuthorize("hasAnyAuthority('admin')")
    public ApiResponse<?> getListPartnerOfUser(@PathVariable("id") String id) {
        return ApiResponse.success(HttpStatus.OK, "Success", partnerService.findPartnerByUser(usersService.findByIdUser(id)));
    }

    @PostMapping(path = "", consumes = {"multipart/form-data"})
    public ApiResponse<?> create(@RequestPart(name = "partner") PartnerRequest partnerRequest, @RequestPart(name = "image") MultipartFile image, @RequestPart(name = "license") MultipartFile license) {
        return ApiResponse.success(HttpStatus.OK, "create success partner pending", partnerService.create(partnerRequest, image, license));
    }

    @PostMapping(path = "/all", consumes = {"multipart/form-data"})
    public ApiResponse<?> createPartnerV2(@RequestPart(name = "partner") PartnerV2Request partnerV2Request,
                                          @RequestPart(name = "image") MultipartFile image,
                                          @RequestPart(name = "license") MultipartFile license,
                                          @RequestPart(name = "hotelDetailImages") MultipartFile[] lsHotelDetailImages
    ) {
        return ApiResponse.success(HttpStatus.OK, "create success partner pending", partnerService.createV2(partnerV2Request, image, license, lsHotelDetailImages));
    }
}
