package com.datn.api.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.datn.api.entity.PhotosOfHotel;

@Repository
public interface PhotosOfHotelRepository extends JpaRepository<PhotosOfHotel,Long> {

}
