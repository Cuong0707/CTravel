package com.datn.api.entity.dto;


import com.datn.api.enums.PartnerStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PartnersDto {
	private String partnerId;
	private UsersDto user;
	private ServiceDto services;
	private String email;
	private String nameOfCompany;
	private String avatar;
	private String taxCode;
	private String avatarOfCompany;
	private String businessLicense;
	private String website;
	private PartnerStatus status;
}
