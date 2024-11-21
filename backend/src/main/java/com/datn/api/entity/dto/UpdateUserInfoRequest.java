package com.datn.api.entity.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateUserInfoRequest {
    private String fullname;
    private String avatar;
    private String phone_number;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate birthday;
    private String address;
    private Long district;
}
