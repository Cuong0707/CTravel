package com.datn.api.services;



import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import com.datn.api.entity.HotelDetails;
import com.datn.api.entity.Orders;
import com.datn.api.entity.OrdersOfHotel;
import com.datn.api.entity.Partners;
import com.datn.api.entity.Users;
import com.datn.api.entity.dto.HotelDto;
import com.datn.api.entity.dto.OrderDto;
import com.datn.api.entity.dto.OrderQueryParam;
import com.datn.api.entity.dto.OrderRequest;
import com.datn.api.entity.dto.OrderResponse;
import com.datn.api.entity.dto.OrdersOfHotelDto;
import com.datn.api.entity.dto.OrdersOfUserResponse;
import com.datn.api.entity.dto.UpdateOrderRequest;
import com.datn.api.enums.OrderStatus;
import com.datn.api.exceptions.DuplicateRecordException;
import com.datn.api.exceptions.NotFoundException;
import com.datn.api.repository.HotelsDetailsRepository;
import com.datn.api.repository.HotelsRepository;
import com.datn.api.repository.OrdersOfHotelRepository;
import com.datn.api.repository.OrdersRepository;
import com.datn.api.repository.PartnerRepository;
import com.datn.api.repository.UsersRepository;

@Component
public class OrdersServiceImpl implements OrdersService{
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    OrdersRepository ordersRepository;

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    PartnerRepository partnerRepository;
    @Autowired
    PartnerService partnerService;

    @Autowired
    OrdersOfHotelRepository ordersOfHotelRepository;
    @Autowired
    HotelDetailService hotelDetailService;

    @Autowired
    HotelsRepository hotelsRepository;

	@Autowired
	HotelService hotelService;
    private Double sum=0D;
    @Autowired
    private HotelsDetailsRepository hotelsDetailsRepository;
    
    @Autowired
    OrderOfHotelServiceImpl orderOfHotelServiceImpl;

    @Override
    public Orders create(OrderRequest orderRequest){
        try{
            Orders orders = new Orders();
            Partners partners=partnerService.findPartnerById(orderRequest.getPartnerId());
            Users users = UserCurrent.get();
            orders.setUser(users);
            orders.setPartner(partners);
            orders.setPaymentMethod(orderRequest.getPaymentMethod());
            orders.setOrderDate(LocalDateTime.now());
            orders.setStatus(OrderStatus.pending);
            Orders ordersSaved = ordersRepository.save(orders);
            System.out.println(ordersSaved.getOrderID());
            OrdersOfHotel ordersOfHotel = new OrdersOfHotel();
            orderRequest.getOrdersOfHotels().forEach(item->{
                HotelDetails hotelDetails= hotelDetailService.findHotelDetailById(item.getHotelDetailId());
                ordersOfHotel.setAmountOfRoom(item.getAmountOfRoom());
                ordersOfHotel.setCheckInDate(item.getCheckInDate());
                ordersOfHotel.setLengthOfStay(item.getLengthOfStay());
                ordersOfHotel.setNumberOfChildren(item.getNumberOfChildren());
                ordersOfHotel.setNumberOfPeople(item.getNumberOfPeople());
                ordersOfHotel.setOriginalPrice(hotelDetails.getPriceOfRoom());

                ordersOfHotel.setOrders(ordersSaved);
                ordersOfHotel.setHotelDetails(hotelDetails);
                ordersOfHotelRepository.save(ordersOfHotel);

            });
            return ordersRepository.findById(ordersSaved.getOrderID()).get();
        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new DuplicateRecordException("Creat error");
        }

    }


    @Override
    public Orders updateForUser(Long id, UpdateOrderRequest request) {
        Orders orders =checkOrderOfUser (id,UserCurrent.get());
        if (orders.getStatus().equals(OrderStatus.pending)) {
            if (request.getStatus().equals("canceled")) {
                orders.setStatus(OrderStatus.canceled);
            }
            return ordersRepository.save(orders);
        }
        throw new DuplicateRecordException("User can not update status while status is not pending");
    }
    @Override
    public Orders updateForPartner(Long id, UpdateOrderRequest request) {
        Orders orders =checkOrderOfPartner (id,partnerService.findPartnerByUser(UserCurrent.get()));
        if (orders.getStatus().equals(OrderStatus.completed)) {
            throw new DuplicateRecordException("Partner cannot update status while status is completed");
        }
        if (request.getStatus().equals("confirmed")) {
            orders.setStatus(OrderStatus.confirmed);
        } else if (request.getStatus().equals("completed")) {
            orders.setStatus(OrderStatus.completed);
        } else if (request.getStatus().equals("canceled")) {
            orders.setStatus(OrderStatus.canceled);
        } else {
            throw new DuplicateRecordException("Invalid order status: " + request.getStatus());
        }
        return ordersRepository.save(orders);
    }
    @Override
    public OrderDto getOneOrder(Long id){
        Optional<Orders> orders = ordersRepository.findById(id);
        if(orders.isPresent()){
			return orderDto(orders.get());
        }
        throw new NotFoundException("Not found order with Id"+id);
    }
    @Override
    public OrderResponse getAllOrder(Integer pageNumber, Integer pageSize, String sortDir, String sortBy){
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize,sort);

        Page<Orders> orders = ordersRepository.findAll(pageable);

		List<OrdersOfUserResponse> ordersOfUserResponseList = new ArrayList<>();

		orders.getContent().forEach(order -> {
			HotelDto hotelDto = hotelService.findByPartner(order.getPartner().getPartnerId());
			OrdersOfUserResponse ordersOfUserResponse = new OrdersOfUserResponse();
			ordersOfUserResponse.setOrder(orderDto(order));
			ordersOfUserResponse.setService(order.getPartner().getServices().getService());
			ordersOfUserResponse.setHotelName(hotelDto.getNameOfHotel());
			ordersOfUserResponse.setHotelAddress(hotelDto.getAddress());
			ordersOfUserResponseList.add(ordersOfUserResponse);
		});

        OrderResponse orderResponse = new OrderResponse();
		orderResponse.setContent(ordersOfUserResponseList);
        orderResponse.setPageNumber(orders.getNumber());
        orderResponse.setPageSize(orders.getSize());
        orderResponse.setTotalElements(orders.getTotalElements());
        orderResponse.setTotalPages(orders.getTotalPages());
        orderResponse.setLastPage(orders.isLast());
        return orderResponse;
    }
    @Override
	public OrderResponse getOrdersOfUser(Integer pageNumber, Integer pageSize, String sortDir, String sortBy)
			throws Exception {
		try {
			Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
					: Sort.by(sortBy).descending();
			Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
			Users users = UserCurrent.get();
			Page<Orders> orders = ordersRepository.getAllByUser(users, pageable);
			List<OrdersOfUserResponse> ordersOfUserResponseList = new ArrayList<>();

			orders.getContent().forEach(order -> {
				HotelDto hotelDto = hotelService.findByPartner(order.getPartner().getPartnerId());
				OrdersOfUserResponse ordersOfUserResponse = new OrdersOfUserResponse();
				ordersOfUserResponse.setOrder(orderDto(order));
				ordersOfUserResponse.setService(order.getPartner().getServices().getService());
				ordersOfUserResponse.setHotelName(hotelDto.getNameOfHotel());
				ordersOfUserResponse.setHotelAddress(hotelDto.getAddress());
				ordersOfUserResponseList.add(ordersOfUserResponse);
			});
			OrderResponse orderResponse = new OrderResponse();
			orderResponse.setContent(ordersOfUserResponseList);
			orderResponse.setPageNumber(orders.getNumber());
			orderResponse.setPageSize(orders.getSize());
			orderResponse.setTotalElements(orders.getTotalElements());
			orderResponse.setTotalPages(orders.getTotalPages());
			orderResponse.setLastPage(orders.isLast());
			return orderResponse;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			throw new Exception(e.getMessage());
		}
    }

    @Override
    public OrderResponse filterOrderOfUser(LocalDate startDate, LocalDate endDate, Integer pageNumber, Integer pageSize, String sortDir, String sortBy) throws Exception {
        try {
            Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                    : Sort.by(sortBy).descending();
            Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
            Users users = UserCurrent.get();
            Page<Orders> orders = ordersRepository.filterOrderOfUser(UserCurrent.get(),startDate.atStartOfDay(),endDate.atTime(23, 59, 59), pageable);
            List<OrdersOfUserResponse> ordersOfUserResponseList = new ArrayList<>();

            orders.getContent().forEach(order -> {
                HotelDto hotelDto = hotelService.findByPartner(order.getPartner().getPartnerId());
                OrdersOfUserResponse ordersOfUserResponse = new OrdersOfUserResponse();
                ordersOfUserResponse.setOrder(orderDto(order));
                ordersOfUserResponse.setService(order.getPartner().getServices().getService());
                ordersOfUserResponse.setHotelName(hotelDto.getNameOfHotel());
                ordersOfUserResponse.setHotelAddress(hotelDto.getAddress());
                ordersOfUserResponseList.add(ordersOfUserResponse);
            });
            OrderResponse orderResponse = new OrderResponse();
            orderResponse.setContent(ordersOfUserResponseList);
            orderResponse.setPageNumber(orders.getNumber());
            orderResponse.setPageSize(orders.getSize());
            orderResponse.setTotalElements(orders.getTotalElements());
            orderResponse.setTotalPages(orders.getTotalPages());
            orderResponse.setLastPage(orders.isLast());
            return orderResponse;
        } catch (Exception e) {
            System.out.println(e.getMessage() + "HELLO");
            throw new Exception(e.getMessage());
        }
    }


    @Override
	public OrderResponse getOrdersOfPartner(Integer pageNumber, Integer pageSize, String sortDir,
                                            String sortBy) {
        Partners partners =partnerService.findPartnerByUser(UserCurrent.get());
		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
				: Sort.by(sortBy).descending();
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

		Page<Orders> orders = ordersRepository.getOrdersByPartner(partners, pageable);

		List<OrdersOfUserResponse> ordersOfUserResponseList = new ArrayList<>();

		orders.getContent().forEach(order -> {
			HotelDto hotelDto = hotelService.findByPartner(order.getPartner().getPartnerId());
			OrdersOfUserResponse ordersOfUserResponse = new OrdersOfUserResponse();
			ordersOfUserResponse.setOrder(orderDto(order));
			ordersOfUserResponse.setService(order.getPartner().getServices().getService());
			ordersOfUserResponse.setHotelName(hotelDto.getNameOfHotel());
			ordersOfUserResponse.setHotelAddress(hotelDto.getAddress());
			ordersOfUserResponseList.add(ordersOfUserResponse);
		});

		OrderResponse orderResponse = new OrderResponse();
		orderResponse.setContent(ordersOfUserResponseList);
		orderResponse.setPageNumber(orders.getNumber());
		orderResponse.setPageSize(orders.getSize());
		orderResponse.setTotalElements(orders.getTotalElements());
		orderResponse.setTotalPages(orders.getTotalPages());
		orderResponse.setLastPage(orders.isLast());
		return orderResponse;
	}

    @Override
    public OrderResponse getOrdersOfPartnerForAdmin(String id, Integer pageNumber, Integer pageSize, String sortDir,
                                                    String sortBy) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Partners partners = partnerRepository.findPartnerByUserID(id).orElseThrow(()->new NotFoundException("Not fond partner with userId "+id));

        Page<Orders> orders = ordersRepository.getOrdersByPartner(partners, pageable);

		List<OrdersOfUserResponse> ordersOfUserResponseList = new ArrayList<>();

		orders.getContent().forEach(order -> {
			HotelDto hotelDto = hotelService.findByPartner(order.getPartner().getPartnerId());
			OrdersOfUserResponse ordersOfUserResponse = new OrdersOfUserResponse();
			ordersOfUserResponse.setOrder(orderDto(order));
			ordersOfUserResponse.setService(order.getPartner().getServices().getService());
			ordersOfUserResponse.setHotelName(hotelDto.getNameOfHotel());
			ordersOfUserResponse.setHotelAddress(hotelDto.getAddress());
			ordersOfUserResponseList.add(ordersOfUserResponse);
		});

        OrderResponse orderResponse = new OrderResponse();
		orderResponse.setContent(ordersOfUserResponseList);
        orderResponse.setPageNumber(orders.getNumber());
        orderResponse.setPageSize(orders.getSize());
        orderResponse.setTotalElements(orders.getTotalElements());
        orderResponse.setTotalPages(orders.getTotalPages());
        orderResponse.setLastPage(orders.isLast());
        return orderResponse;
    }

	public OrderDto orderDto(Orders orders) {
		sum = 0D;
		List<OrdersOfHotel> ordersOfHotels = ordersOfHotelRepository.findOrdersOfHotelByOrders(orders);
		List<OrdersOfHotelDto> ordersOfHotelDtos = ordersOfHotels.stream()
				.map(orders1 -> orderOfHotelServiceImpl.ordersOfHotelDto(orders1)).collect(Collectors.toList());
        ordersOfHotels.forEach(orderOfHotel -> {
            if(orderOfHotel.getPromotionPrice()==null){
                sum+=orderOfHotel.getOriginalPrice()*orderOfHotel.getLengthOfStay()*orderOfHotel.getAmountOfRoom();
            }else {
                sum+=orderOfHotel.getPromotionPrice()*orderOfHotel.getLengthOfStay()*orderOfHotel.getAmountOfRoom();
            }
        });
        List<HotelDetails> lsHotelDetails = ordersOfHotels.stream().map((o) -> o.getHotelDetails()).collect(Collectors.toList());
        OrderDto orderDto = modelMapper.map(orders, OrderDto.class);
		orderDto.setOrdersOfHotels(ordersOfHotelDtos);
        orderDto.setPartnerID(orders.getPartner().getPartnerId());
        orderDto.setUserID(orders.getUser().getUserID());
        orderDto.setTotalPrice(sum);
        orderDto.getOrdersOfHotels().forEach((hotel) -> {
            HotelDetails existed = lsHotelDetails.stream().filter((hotelDetaill) -> hotelDetaill.getHotelDetailID().equals(hotel.getHotelDetailId())).findFirst().get();
            if(existed != null){
                hotel.setTypeOfRoom(existed.getTypeOfRoom());
            }
        });
        return orderDto;
    }

    @Override
    public Orders findOrdersById(Long id){
        return ordersRepository.findById(id).orElseThrow(()-> new NotFoundException("Not found order with id "+id));
    }
    @Override
    public Orders checkOrderOfUser(Long id, Users users){
        return ordersRepository.checkOrderOfUser(id,users).orElseThrow(()-> new NotFoundException("Not found order with id "+id+" of user "+users.getUserID()));
    }
    @Override
    public Orders checkOrderOfPartner(Long id, Partners partners){
        return ordersRepository.checkOrderOfPartner(id,partners).orElseThrow(()-> new NotFoundException("Not found order with id "+id+" of partner"+partners.getPartnerId()));
    }

    @Override
    public OrderResponse filterOrder(OrderQueryParam orderQueryParam){
        if(orderQueryParam.getSortFiled()==null|| orderQueryParam.getSortFiled().isEmpty()){
            orderQueryParam.setSortFiled("orderDate");
        }
        Sort sort = orderQueryParam.getOrderBy().equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(orderQueryParam.getSortFiled()).ascending()
                : Sort.by(orderQueryParam.getSortFiled()).descending();
        Pageable pageable = PageRequest.of(orderQueryParam.getPage(), orderQueryParam.getPageSize(),sort);
        Page<Orders> ordersPage = ordersRepository.filterOrder(
                orderQueryParam.getStatus(),
                pageable
        );
        List<OrdersOfUserResponse> ordersOfUserResponseList = new ArrayList<>();

        ordersPage.getContent().forEach(order -> {
            HotelDto hotelDto = hotelService.findByPartner(order.getPartner().getPartnerId());
            OrdersOfUserResponse ordersOfUserResponse = new OrdersOfUserResponse();
            ordersOfUserResponse.setOrder(orderDto(order));
            ordersOfUserResponse.setService(order.getPartner().getServices().getService());
            ordersOfUserResponse.setHotelName(hotelDto.getNameOfHotel());
            ordersOfUserResponse.setHotelAddress(hotelDto.getAddress());
            ordersOfUserResponseList.add(ordersOfUserResponse);
        });
        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setContent(ordersOfUserResponseList);
        orderResponse.setPageNumber(ordersPage.getNumber());
        orderResponse.setPageSize(ordersPage.getSize());
        orderResponse.setTotalElements(ordersPage.getTotalElements());
        orderResponse.setTotalPages(ordersPage.getTotalPages());
        orderResponse.setLastPage(ordersPage.isLast());
        return orderResponse;
    }

    @Override
    public OrderResponse filterOrderOfPartner(OrderQueryParam orderQueryParam) {
        Partners partners = partnerService.findPartnerByUser(UserCurrent.get());
        if(orderQueryParam.getSortFiled()==null|| orderQueryParam.getSortFiled().isEmpty()){
            orderQueryParam.setSortFiled("orderDate");
        }
        Sort sort = orderQueryParam.getOrderBy().equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(orderQueryParam.getSortFiled()).ascending()
                : Sort.by(orderQueryParam.getSortFiled()).descending();
        Pageable pageable = PageRequest.of(orderQueryParam.getPage(), orderQueryParam.getPageSize(),sort);
        Page<Orders> ordersPage = ordersRepository.filterOrderOfPartner(
                orderQueryParam.getStatus(),
                partners,
                pageable
        );

        List<OrdersOfUserResponse> ordersOfUserResponseList = new ArrayList<>();

        ordersPage.getContent().forEach(order -> {
            HotelDto hotelDto = hotelService.findByPartner(order.getPartner().getPartnerId());
            OrdersOfUserResponse ordersOfUserResponse = new OrdersOfUserResponse();
            ordersOfUserResponse.setOrder(orderDto(order));
            ordersOfUserResponse.setService(order.getPartner().getServices().getService());
            ordersOfUserResponse.setHotelName(hotelDto.getNameOfHotel());
            ordersOfUserResponse.setHotelAddress(hotelDto.getAddress());
            ordersOfUserResponseList.add(ordersOfUserResponse);
        });
        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setContent(ordersOfUserResponseList);
        orderResponse.setPageNumber(ordersPage.getNumber());
        orderResponse.setPageSize(ordersPage.getSize());
        orderResponse.setTotalElements(ordersPage.getTotalElements());
        orderResponse.setTotalPages(ordersPage.getTotalPages());
        orderResponse.setLastPage(ordersPage.isLast());
        return orderResponse;
    }
}
