package com.datn.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.datn.api.entity.Hotels;
import com.datn.api.entity.Partners;
import com.datn.api.entity.Provinces;

import jakarta.transaction.Transactional;

@Repository
public interface HotelsRepository extends JpaRepository<Hotels, Long> {

	@Query("select o from  Hotels o where o.partner=?1 and o.isDelete=false ")
	Optional<Hotels> findHotelsByPartner(Partners partners);

	@Query("select h from Hotels h where h.status = 'Available' and h.isDelete = false and h.standard like %?1")
	List<Hotels> findByStandard(String standard);

	@Query("select h from Hotels h where h.status = 'Available' and h.isDelete = false and (h.nameOfHotel like %?1% or h.description like %?1%)")
	Page<Hotels> findHotelByKeyword(String keywords, Pageable pageable);

	@Modifying
	@Transactional
	@Query(value = "update Hotels h set h.view = h.view + 1 where h.hotelID = ?1 and h.isDelete = false", nativeQuery = true)
	void autoIncreaseViews(Long id);



	@Query(value = "select * from Hotels order by view DESC limit 10", nativeQuery = true)
	Page<Object[]> findTop10HotelsWithMostOrdersAndHighestView(Pageable pageable);


	@Query("select o from  Hotels o where  o.isDelete=false and o.districts.provinces=?1")
	Page<Hotels> findByProvinces(Provinces provinces, Pageable pageable);



	@Query("select o from  Hotels o where  o.isDelete=false and o.partner=?1")
	Optional<Hotels> findByPartner(Partners partners);

	@Query("select o from Hotels o where  o.isDelete=false and o.hotel_ID=?1 and o.partner=?2")
	Hotels checkHotelOfPartner(Long id,Partners partners);
	@Query ("select o from Hotels o where o.standard=?1 and o.districts.districtID=?2 and o.nameOfHotel like %?3% and o.isDelete=false and o.status = 'Available'")
	Page<Hotels> filterHotel(String standard,Long districtId,String keyword,Pageable pageable);
}
