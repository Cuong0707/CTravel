package com.datn.api.repository;




import java.util.Optional;

import com.datn.api.enums.PartnerStatus;
import com.datn.api.enums.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.datn.api.entity.Partners;
import com.datn.api.entity.Users;


@Repository
public interface PartnerRepository extends JpaRepository<Partners, String> {
    Optional<Partners> findByEmail(String email);

    Optional<Partners> findByUser(Users user);

	@Query("select p from Partners p where p.user.userID=?1")
	Optional<Partners> findPartnerByUserID(String userID);


    @Query("select o from  Partners o where  o.user=?1")
    Page<Partners> findByUser(Users users, Pageable pageable);

    @Query ("select o from Partners o where o.status=?1 and o.isDelete=false ")
    Page<Partners> filterPartner(PartnerStatus partnerStatus, Pageable pageable);


}
