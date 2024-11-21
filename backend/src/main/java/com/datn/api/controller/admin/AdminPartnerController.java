package com.datn.api.controller.admin;

import com.datn.api.entity.dto.PartnerQueryParam;
import com.datn.api.entity.dto.UpdatePartnerAdminRequest;
import com.datn.api.exceptions.ApiResponse;
import com.datn.api.services.PartnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admins/partners")
@PreAuthorize("hasAuthority('admin')")
public class AdminPartnerController {
    @Autowired
    PartnerService partnerService;
    @GetMapping("")
    public ApiResponse<?> getPartners(
            @RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir,
            @RequestParam(value = "sortBy", defaultValue = "taxCode", required = false) String sortBy)
    {
        return ApiResponse.success(HttpStatus.OK,"success",partnerService.getAllPartners(pageNumber,pageSize,sortBy,sortDir));
    }
    @GetMapping("/filter/all")
    public ApiResponse<?> getPartners(
            PartnerQueryParam partnerQueryParam)
    {
        return ApiResponse.success(HttpStatus.OK,"success",partnerService.filterPartner(partnerQueryParam));
    }
    @GetMapping("/{id}")
    public ApiResponse<?> getPartner(@PathVariable String id){
        return ApiResponse.success(HttpStatus.OK,"success",partnerService.findPartnerById(id));
    }
    @PutMapping("/{id}")
    public ApiResponse<?> updateForAdmin(@PathVariable("id") String id,@RequestBody UpdatePartnerAdminRequest updatePartnerAdminRequest){
        return ApiResponse.success(HttpStatus.OK,"update status for partner success and role partner",partnerService.updateForAdmin(id,updatePartnerAdminRequest));
    }

}
