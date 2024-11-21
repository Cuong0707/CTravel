package com.datn.api.repository;


import com.datn.api.enums.OrderStatus;
import com.datn.api.enums.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.datn.api.entity.Orders;
import com.datn.api.entity.Partners;
import com.datn.api.entity.Users;

import java.time.LocalDateTime;
import java.util.Optional;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
    @Query("select o from Orders o where o.user = ?1")
    Page<Orders> getAllByUser(Users user, Pageable pageable);


    @Query("SELECT o FROM Orders o where o.partner=?1")
	Page<Orders> getOrdersByPartner(Partners partners, Pageable pageable);

	@Query("SELECT o FROM Orders o where o.partner=?1 and o.status='completed'")
	Page<Orders> getCompletedOrdersByPartner(Partners partners, Pageable pageable);

    @Query("SELECT o from Orders o WHERE o.orderID=?1 and o.user=?2")
    Optional<Orders> checkOrderOfUser(Long id,Users users);
    @Query("SELECT o from Orders o WHERE o.orderID=?1 and o.partner=?2")
    Optional<Orders> checkOrderOfPartner(Long id,Partners partners);
    @Query ("select o from Orders o where o.status=?1 ")
    Page<Orders> filterOrder(OrderStatus userStatus, Pageable pageable);
    @Query ("select o from Orders o where o.status=?1 and o.partner=?2")
    Page<Orders> filterOrderOfPartner(OrderStatus userStatus,Partners partner,  Pageable pageable);
    @Query("SELECT o FROM Orders o WHERE o.user = :users AND o.orderDate >= :startDate AND o.orderDate <= :endDate")
    Page<Orders> filterOrderOfUser(Users users, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
}
