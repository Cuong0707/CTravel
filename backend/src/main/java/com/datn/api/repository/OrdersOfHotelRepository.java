package com.datn.api.repository;

import com.datn.api.entity.Hotels;
import com.datn.api.entity.Orders;
import com.datn.api.entity.OrdersOfHotel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface OrdersOfHotelRepository extends JpaRepository<OrdersOfHotel, Long> {
    @Query("SELECT o FROM OrdersOfHotel o WHERE o.orders=?1")
    List<OrdersOfHotel> findOrdersOfHotelByOrders(Orders orders);

}
