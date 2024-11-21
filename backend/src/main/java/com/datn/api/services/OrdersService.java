package com.datn.api.services;


import com.datn.api.entity.dto.*;
import org.springframework.stereotype.Service;

import com.datn.api.entity.Orders;
import com.datn.api.entity.Partners;
import com.datn.api.entity.Users;

import java.time.LocalDate;


@Service
public interface OrdersService {
    Orders create(OrderRequest orderRequest);


    Orders updateForUser(Long id, UpdateOrderRequest request);

    Orders updateForPartner(Long id, UpdateOrderRequest request);

    OrderDto getOneOrder(Long id);

    OrderResponse getAllOrder(Integer pageNumber, Integer pageSize, String sortDir, String sortBy);

	OrderResponse getOrdersOfUser(Integer pageNumber, Integer pageSize, String sortDir, String sortBy) throws Exception;

    OrderResponse filterOrderOfUser(LocalDate startDate, LocalDate endDate, Integer pageNumber, Integer pageSize, String sortDir, String sortBy) throws Exception;
    OrderResponse getOrdersOfPartner(Integer pageNumber, Integer pageSize, String sortDir,
                                     String sortBy);

    OrderResponse getOrdersOfPartnerForAdmin(String id, Integer pageNumber, Integer pageSize, String sortDir,
                                             String sortBy);

    Orders findOrdersById(Long id);

    Orders checkOrderOfUser(Long id, Users users);

    Orders checkOrderOfPartner(Long id, Partners partners);

    OrderResponse filterOrder(OrderQueryParam orderQueryParam);
    OrderResponse filterOrderOfPartner(OrderQueryParam orderQueryParam);
}
