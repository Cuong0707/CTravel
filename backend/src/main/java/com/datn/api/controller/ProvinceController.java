package com.datn.api.controller;

import com.datn.api.exceptions.ApiResponse;
import com.datn.api.repository.ProvincesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/provinces")
public class ProvinceController {
    @Autowired
    ProvincesRepository provincesRepository;
    @GetMapping()
    public ApiResponse<?> getAll(){
        return  ApiResponse.success(HttpStatus.OK,"success",provincesRepository.findAll());
    }
}
