package com.datn.api.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.datn.api.exceptions.ApiResponse;
import com.datn.api.repository.ServicesRepository;



@RestController
@RequestMapping("/api/v1/services")
public class ServiceController {
    @Autowired
    ServicesRepository servicesRepository;

    @GetMapping()
    public ApiResponse<?> getAll(){
        return ApiResponse.success(HttpStatus.OK,"success",servicesRepository.findAll());
    }
}
