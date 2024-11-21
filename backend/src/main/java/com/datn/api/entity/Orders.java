package com.datn.api.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;

import com.datn.api.enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "orders")
public class Orders {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "order_id", nullable = false)
	private Long orderID;

	@ManyToOne
	@JoinColumn(name = "partner_id")
	@JsonBackReference
	private Partners partner;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonBackReference
	private Users user;

	@Column(name = "order_date")
	@CreatedDate
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime orderDate;

	@Column(name = "payment_method", nullable = false, length = 50)
	private String paymentMethod;


	@Column(name = "status", nullable = false)
	@Enumerated(EnumType.STRING)
	private OrderStatus status;

	@OneToMany(mappedBy = "orders")
	@JsonManagedReference
	List<OrdersOfHotel> ordersOfHotels;

}
