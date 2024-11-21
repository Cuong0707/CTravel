package com.datn.api.controller.admin;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.datn.api.entity.dto.NumberRegister;
import com.datn.api.entity.dto.UserQueryParam;
import com.datn.api.exceptions.ApiResponse;
import com.datn.api.services.OrdersService;
import com.datn.api.services.UsersService;

@RestController
@RequestMapping("/api/v1/admins/users")
@PreAuthorize("hasAuthority('admin')")
public class AdminUserController {
    @Autowired
    OrdersService ordersService;
    @Autowired
    UsersService usersService;
    @GetMapping("")
    public ApiResponse<?> getAllUsers(
            @RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir,
            @RequestParam(value = "sortBy", defaultValue = "fullname", required = false) String sortBy
    ){
        return ApiResponse.success(HttpStatus.OK, "success",usersService.getAllUsers(pageNumber, pageSize,sortDir,sortBy));
    }
    @GetMapping("/filter/all")
    public ApiResponse<?> filterUser(
            UserQueryParam userQueryParam
    ){
        return ApiResponse.success(HttpStatus.OK, "success",usersService.filterUser(userQueryParam));
    }
    @GetMapping("/{id}")
    public ApiResponse<?> getUser(@PathVariable("id")String id){
        return ApiResponse.success(HttpStatus.OK, "success",usersService.usersToDto(usersService.findByIdUser(id)));
    }

    @PutMapping("/{id}")
    public ApiResponse<?> updateStatusUser(@PathVariable String id){
        return ApiResponse.success(HttpStatus.OK,"Update success",usersService.updateStatusForAdmin(id));
    }

	@GetMapping("/report/users-new")
	public ApiResponse<NumberRegister> reportNumberNewUsers(
			@RequestParam(value = "startDate", required = false) LocalDate startDate,
			@RequestParam(value = "endDate", required = false) LocalDate endDate) {
		return ApiResponse.success(HttpStatus.OK, "success", usersService.numberRegister(startDate, endDate));
	}
}
