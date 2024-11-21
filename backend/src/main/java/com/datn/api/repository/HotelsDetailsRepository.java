package com.datn.api.repository;

import com.datn.api.entity.Admins;
import com.datn.api.entity.HotelDetails;
import com.datn.api.entity.Hotels;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelsDetailsRepository extends JpaRepository<HotelDetails, Long> {
    @Query("select o from  HotelDetails o where o.isDelete=false")
    Page<HotelDetails> getAll(Pageable pageable);

    @Query("select o from HotelDetails o where  o.hotels=?1 and o.isDelete=false and o.status='Available'")
    Page<HotelDetails> getHotelDetailsByHotels(Hotels hotel, Pageable pageable);
}
