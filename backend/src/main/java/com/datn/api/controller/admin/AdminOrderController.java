package com.datn.api.controller.admin;

import com.datn.api.entity.dto.OrderQueryParam;
import com.datn.api.entity.dto.PartnerQueryParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.datn.api.exceptions.ApiResponse;
import com.datn.api.services.OrdersService;

@RestController
@RequestMapping("/api/v1/admins/orders")
@PreAuthorize("hasAuthority('admin')")
public class AdminOrderController {
    @Autowired
    OrdersService ordersService;

    @GetMapping("")
    public ApiResponse<?> getAll(@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
                                 @RequestParam(value = "pageSize", defaultValue = "8", required = false) Integer pageSize,
                                 @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir,
                                 @RequestParam(value = "sortBy", defaultValue = "orderDate", required = false) String sortBy)
    {

        return ApiResponse.success(HttpStatus.OK,"success",ordersService.getAllOrder(pageNumber,pageSize,sortDir,sortBy));
    }
    @GetMapping("/filter/all")
    public ApiResponse<?> filterOrder(
            OrderQueryParam orderQueryParam)
    {
        return ApiResponse.success(HttpStatus.OK,"success",ordersService.filterOrder(orderQueryParam));
    }
    @GetMapping("/users/{id}")
    public ApiResponse<?> getOrderOfUser(
            @PathVariable String id,
            @RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir,
			@RequestParam(value = "sortBy", defaultValue = "orderDate", required = false) String sortBy)
			throws Exception
    {
        return ApiResponse.success(HttpStatus.OK,"success",ordersService.getOrdersOfUser(pageNumber,pageSize,sortDir,sortBy));
    }
    @GetMapping("/partners/{id}")
    public ApiResponse<?> getOrderOfPartner(
            @PathVariable String id,
            @RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = "8", required = false) Integer pageSize,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir,
            @RequestParam(value = "sortBy", defaultValue = "orderDate", required = false) String sortBy)
    {
        return ApiResponse.success(HttpStatus.OK,"success",ordersService.getOrdersOfPartnerForAdmin(id,pageNumber,pageSize,sortDir,sortBy));
    }
}
