package com.datn.api.controller;

import com.datn.api.entity.dto.UpdateUserInfoRequest;
import com.datn.api.services.ImageStorageService;
import com.datn.api.services.UserCurrent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.datn.api.entity.dto.UsersDto;
import com.datn.api.exceptions.ApiResponse;
import com.datn.api.services.UsersServiceImpl;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    UsersServiceImpl usersService;
    @Autowired
    ImageStorageService storageService;

    @GetMapping("")
    public ApiResponse<?> getUser() {
        return ApiResponse.success(HttpStatus.OK, "success", usersService.usersToDto(UserCurrent.get()));
    }

    @PutMapping(path = "", consumes = {"multipart/form-data"})

    public ApiResponse<?> update(@RequestPart("information") UpdateUserInfoRequest updateUserInfoRequest, @Nullable @RequestParam(name = "image") MultipartFile file) {
        try {
            UsersDto user = usersService.updateForUser(updateUserInfoRequest, file);
            return ApiResponse.success(HttpStatus.OK, "Update success", user);
        } catch (Exception e) {
            return ApiResponse.error(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PutMapping("/avatar")
    public ApiResponse<?> updateAvatar(@RequestParam(name = "image") MultipartFile file) {
        return ApiResponse.success(HttpStatus.OK, "Update success", usersService.updateAvatarForUser(file));
    }
}
