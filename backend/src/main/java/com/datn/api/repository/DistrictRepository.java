package com.datn.api.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.datn.api.entity.Districts;


@Repository
public interface DistrictRepository extends JpaRepository<Districts, Long> {
	@Query("select d from Districts d where d.provinces.provinceID like ?1")
	List<Districts> findByProvinces(Long provinceID);

	@Query("select d from Districts d where d.provinces.nameOfProvince like %?1%")
	List<Districts> findByProvinceName(String nameOfDistrict);
}
