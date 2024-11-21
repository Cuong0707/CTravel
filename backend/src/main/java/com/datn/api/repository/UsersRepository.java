package com.datn.api.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.datn.api.entity.Hotels;
import com.datn.api.enums.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.datn.api.entity.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, String> {
	Optional<Users> findByEmailAndPasswordNotNull(String username);

	Optional<Users> findByEmailAndPasswordNull(String username);

	Optional<Users> findByEmail(String email);

	@Query("select o  from Users o where  o.fullname like %?1% or o.email like %?1% ")
	List<Users> findByKeywords(String keywords);

	// Hàm đếm sô lượng người đăng ký
	@Query("SELECT COUNT(u.userID) FROM Users u WHERE u.registrationDate >= :startDate AND u.registrationDate < :endDate")
	Integer countUsersForDate(LocalDateTime startDate, LocalDateTime endDate);

	@Query("SELECT u FROM Users u WHERE u.token=?1")
	Optional<Users> getUsersByToken(String token);

	@Query ("select o from Users o where o.status=?1 and o.isDelete=false ")
	Page<Users> filterUser(UserStatus userStatus, Pageable pageable);
}
