package com.datn.api.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.datn.api.entity.HotelDetails;
import com.datn.api.entity.Hotels;
import com.datn.api.entity.Partners;
import com.datn.api.entity.PhotosOfHotel;
import com.datn.api.entity.Provinces;
import com.datn.api.entity.dto.DistrictDto;
import com.datn.api.entity.dto.HotelDetailDto;
import com.datn.api.entity.dto.HotelDto;
import com.datn.api.entity.dto.HotelQueryParam;
import com.datn.api.entity.dto.HotelRequest;
import com.datn.api.entity.dto.HotelResponseDto;
import com.datn.api.entity.dto.PartnersDto;
import com.datn.api.entity.dto.PhotosOfHotelsDto;
import com.datn.api.enums.HotelStatus;
import com.datn.api.exceptions.DuplicateRecordException;
import com.datn.api.exceptions.Exception;
import com.datn.api.exceptions.NotFoundException;
import com.datn.api.repository.DistrictRepository;
import com.datn.api.repository.HotelsRepository;
import com.datn.api.repository.ProvincesRepository;

import jakarta.servlet.http.HttpSession;

@Service
public class HotelServiceImpl implements HotelService {
	@Autowired
	private HotelsRepository hotelsRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private HttpSession session;

	@Autowired
	private DistrictRepository districtRepository;

	@Autowired
	private ProvincesRepository provincesRepository;

	@Autowired
	IStorageService storageService;

	@Autowired
	private PartnerService partnerService;


	public HotelDto updateHotelForAdmin(HotelDto hotelDto, Long hotelId) {
		// Kiểm tra nếu khách sạn không tồn tại thì không tiến hành cập nhật
		Hotels existingHotel = hotelsRepository.findById(hotelId)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy bài đăng với ID: " + hotelId));
		// Cập nhật thông tin hotel từ HotelDto
		existingHotel.setNameOfHotel(hotelDto.getNameOfHotel());
		existingHotel.setTypeOfHotel(hotelDto.getTypeOfHotel());
		existingHotel.setStandard(hotelDto.getStandard());
		existingHotel.setBreakfast(hotelDto.getBreakfast());
		existingHotel.setServiceFee(hotelDto.getServiceFee());
		existingHotel.setCheckIn(hotelDto.getCheckIn());
		existingHotel.setCheckOut(hotelDto.getCheckOut());
		existingHotel.setStatus(hotelDto.getStatus());
		existingHotel.setDescription(hotelDto.getDescription());
		existingHotel.setChildrenPolicies(hotelDto.getChildrenPolicies());
		existingHotel.setTermAndPolicies(hotelDto.getTermAndPolicies());

		Hotels updatedHotel = hotelsRepository.save(existingHotel);

		return this.hotelDto(updatedHotel);
	}

	// update with province

	public HotelDto updateUnavailableToAvailable(HotelDto hotelDto, Long hotelId) {
		Hotels existingHotel = hotelsRepository.findById(hotelId)
				.orElseThrow(() -> new NotFoundException("Không tìm thấy khách sạn với ID: " + hotelId));
		existingHotel.setNameOfHotel(hotelDto.getNameOfHotel());
		existingHotel.setTypeOfHotel(hotelDto.getTypeOfHotel());
		existingHotel.setStandard(hotelDto.getStandard());
		existingHotel.setBreakfast(hotelDto.getBreakfast());
		existingHotel.setServiceFee(hotelDto.getServiceFee());
		existingHotel.setCheckIn(hotelDto.getCheckIn());
		existingHotel.setCheckOut(hotelDto.getCheckOut());
		existingHotel.setStatus(HotelStatus.Available);
		existingHotel.setDescription(hotelDto.getDescription());
		existingHotel.setChildrenPolicies(hotelDto.getChildrenPolicies());
		existingHotel.setChildrenPolicies(hotelDto.getTermAndPolicies());

		Hotels updatedUnavailableHotel = hotelsRepository.save(existingHotel);

		return this.hotelDto(updatedUnavailableHotel);
	}

	@Override
	public Hotels create(HotelRequest hotelRequest) throws Exception {
		try{
			Hotels hotels = new Hotels();
			hotels.setDistricts(districtRepository.findById(hotelRequest.getDistrictId()).orElseThrow());
			hotels.setPartner(partnerService.findPartnerByUser(UserCurrent.get()));
			hotels.setNameOfHotel(hotelRequest.getNameOfHotel());
			hotels.setTypeOfHotel(hotelRequest.getTypeOfHotel());
			hotels.setStandard(hotelRequest.getStandard());
			hotels.setBreakfast(hotelRequest.getBreakfast());
			hotels.setServiceFee(hotelRequest.getServiceFee());
			hotels.setCheckIn(hotelRequest.getCheckIn());
			hotels.setCheckOut(hotelRequest.getCheckOut());
			hotels.setStatus(HotelStatus.Unavailable);
			hotels.setAddress(hotelRequest.getAddress());
			hotels.setView(0L);
			hotels.setDescription(hotelRequest.getDescription());
			hotels.setChildrenPolicies(hotelRequest.getChildrenPolicies());
			hotels.setTermAndPolicies(hotelRequest.getTermAndPolicies());
			return  hotelsRepository.save(hotels);
		}catch (DuplicateRecordException ex){
			throw new DuplicateRecordException("Creat hotel error");
		}
	}
	@Override
	public Hotels update(HotelRequest hotelRequest, Long id) throws Exception {
		try{

			Hotels hotels = findHotelById(id);
			hotels.setDistricts(districtRepository.findById(hotelRequest.getDistrictId()).orElseThrow());
			hotels.setPartner(partnerService.findPartnerByUser(UserCurrent.get()));
			hotels.setNameOfHotel(hotelRequest.getNameOfHotel());
			hotels.setTypeOfHotel(hotelRequest.getTypeOfHotel());
			hotels.setStandard(hotelRequest.getStandard());
			hotels.setBreakfast(hotelRequest.getBreakfast());
			hotels.setServiceFee(hotelRequest.getServiceFee());
			hotels.setCheckIn(hotelRequest.getCheckIn());
			hotels.setCheckOut(hotelRequest.getCheckOut());
			hotels.setStatus(hotelRequest.getStatus());
			hotels.setAddress(hotelRequest.getAddress());
			hotels.setDescription(hotelRequest.getDescription());
			hotels.setChildrenPolicies(hotelRequest.getChildrenPolicies());
			hotels.setTermAndPolicies(hotelRequest.getTermAndPolicies());
			return  hotelsRepository.save(hotels);
		}catch (DuplicateRecordException ex){
			throw new DuplicateRecordException("Update hotel error");
		}
	}
	@Override
	public HotelDto save(HotelDto hotelDto) {
		return null;
	}

	@Override
	public HotelDto update(HotelDto hotelDto, Long aLong) {
		return null;
	}

	@Override
	public void delete(Long id) {
//		
	}

	
	@Override
    public List<HotelDto> findAll() {
        List<Hotels> hotels = this.hotelsRepository.findAll();
        List<HotelDto> hotelDtos = hotels.stream().map(hotel -> this.hotelDto(hotel)).collect(Collectors.toList());
        return hotelDtos;
    }


	@Override
	public HotelDto findById(Long id) {
		Hotels hotel = this.hotelsRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Can't find hotel id: " + id));
		return this.hotelDto(hotel);
	}

	@Override
	public HotelResponseDto findByKeywords(Integer pageNumber, Integer pageSize, String keywords) {

		Pageable pageable = PageRequest.of(pageNumber, pageSize);

		Page<Hotels> hotels = hotelsRepository.findHotelByKeyword(keywords, pageable);

		List<Hotels> listOfHotels = hotels.getContent();

		List<HotelDto> content = listOfHotels.stream().map(this::hotelDto).collect(Collectors.toList());
		HotelResponseDto hotelResponse = new HotelResponseDto();
		hotelResponse.setContent(content);
		hotelResponse.setPageNumber(hotels.getNumber());
		hotelResponse.setPageSize(hotels.getSize());
		hotelResponse.setTotalElements(hotels.getTotalElements());
		hotelResponse.setTotalPages(hotels.getTotalPages());
		hotelResponse.setLastPage(hotels.isLast());
		return hotelResponse;

	}
	@Override
	public HotelResponseDto findByProvinces(Long id,Integer pageNumber, Integer pageSize) {

		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		Provinces provinces = provincesRepository.findById(id).orElseThrow(()->new NotFoundException("Not found provinces with id"+id));
		Page<Hotels> hotels = hotelsRepository.findByProvinces(provinces, pageable);

		// get content for page object
		List<Hotels> listOfHotels = hotels.getContent();

		List<HotelDto> content = listOfHotels.stream().map(this::hotelDto).collect(Collectors.toList());
		HotelResponseDto hotelResponse = new HotelResponseDto();
		hotelResponse.setContent(content);
		hotelResponse.setPageNumber(hotels.getNumber());
		hotelResponse.setPageSize(hotels.getSize());
		hotelResponse.setTotalElements(hotels.getTotalElements());
		hotelResponse.setTotalPages(hotels.getTotalPages());
		hotelResponse.setLastPage(hotels.isLast());
		return hotelResponse;

	}

	public HotelResponseDto findByType(Integer pageNumber, Integer pageSize, String type) {

			if (type.equals("")) {
			Pageable pageable = PageRequest.of(pageNumber, pageSize);
			Page<Object[]> list = hotelsRepository.findTop10HotelsWithMostOrdersAndHighestView(pageable);
			List<Long> longList = new ArrayList<>();
			for (int i = 0; i < list.getContent().size(); i++) {
				longList.add((Long) list.getContent().get(i)[3]);
			}
			List<HotelDto> hotelDtoList = hotelsRepository.findAllById(longList).stream()
					.map(this::hotelDto).collect(Collectors.toList());
			HotelResponseDto hotelResponse = new HotelResponseDto();
			hotelResponse.setContent(hotelDtoList);
			hotelResponse.setPageNumber(list.getNumber());
			hotelResponse.setPageSize(list.getSize());
			hotelResponse.setTotalElements(list.getTotalElements());
			hotelResponse.setTotalPages(list.getTotalPages());
			hotelResponse.setLastPage(list.isLast());
			return hotelResponse;
		} else {
			throw new NotFoundException("Không tìm thấy Hotels theo Type");
		}
	}

	public Hotels dtoToHotel(HotelDto hotelDto) {
		return this.modelMapper.map(hotelDto, Hotels.class);
	}

	public HotelDto hotelDto(Hotels hotel) {
		HotelDto hotelDto = modelMapper.map(hotel, HotelDto.class);
		hotelDto.setPartner(modelMapper.map(hotel.getPartner(),PartnersDto.class));
		hotelDto.setDistrict(modelMapper.map(hotel.getDistricts(), DistrictDto.class));
		List<HotelDetailDto> dtoListDetail = new ArrayList<>();
		for (HotelDetails entity : hotel.getHotelDetails()) {
			HotelDetailDto dto = modelMapper.map(entity,HotelDetailDto.class);
			dtoListDetail.add(dto);
		}
		List<PhotosOfHotelsDto> dtoListPhoto = new ArrayList<>();
		for (PhotosOfHotel entity : hotel.getPhotosOfHotels()) {
			PhotosOfHotelsDto dto = modelMapper.map(entity,PhotosOfHotelsDto.class);
			dtoListPhoto.add(dto);
		}
		hotelDto.setHotelDetails(dtoListDetail);
		hotelDto.setPhotosOfHotels(dtoListPhoto);
		return hotelDto;
	}



	public void autoIncreaseViews(Long hotelID) {
		List<Long> historyHotel = (List<Long>) session.getAttribute("historyHotel");
		if (historyHotel == null) {
			historyHotel = new ArrayList<>();
		}

		boolean hotelExists = false;
		for (Long id : historyHotel) {
			if (id.equals(id)) {
				hotelExists = true;
				break;
			}
		}

		if (!hotelExists) {
			historyHotel.add(hotelID);
			session.setAttribute("historyHotel", historyHotel);
			hotelsRepository.autoIncreaseViews(hotelID);
		}
	}
	@Override
	public HotelDto findByPartner(String id) {
		Partners partners = partnerService.findPartnerById(id);
		Hotels hotels = hotelsRepository.findByPartner(partners)
				.orElseThrow(() -> new NotFoundException("not found hotel with partner id" + id));
		return hotelDto(hotels);
	}
	@Override
	public HotelResponseDto getAllHotels(Integer pageNumber, Integer pageSize, String sortDir, String sortBy, Long id) {
		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
				: Sort.by(sortBy).descending();

		// create Pageable instance
		Pageable pageable = PageRequest.of(pageNumber, pageSize,sort);
		Page<Hotels> hotels;
		if (id != null) {
			Provinces provinces = provincesRepository.findById(id)
					.orElseThrow(() -> new NotFoundException("Not found provinces with id" + id));
			hotels = hotelsRepository.findByProvinces(provinces, pageable);
		} else {
			hotels = hotelsRepository.findAll(pageable);
		}

		// get content for page object
		List<Hotels> listOfHotels = hotels.getContent();
		List<HotelDto> content = listOfHotels.stream().map(hotel -> this.hotelDto(hotel)).collect(Collectors.toList());
		HotelResponseDto hotelResponse = new HotelResponseDto();
		hotelResponse.setContent(content);
		hotelResponse.setPageNumber(hotels.getNumber());
		hotelResponse.setPageSize(hotels.getSize());
		hotelResponse.setTotalElements(hotels.getTotalElements());
		hotelResponse.setTotalPages(hotels.getTotalPages());
		hotelResponse.setLastPage(hotels.isLast());
		return hotelResponse;
	}

	@Override
	public List<HotelDto> findAllHotelsByProvince(String provinceID) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer sumHotelsViewOfUser(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer numberOrderOfHotel(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean deleteHotel(Long id) {
		try{
			Hotels hotels = findHotelById(id);
			hotels.setStatus(HotelStatus.Unavailable);
			hotels.setDelete(true);
			hotelsRepository.save(hotels);
			return true;
		}catch (Exception ex){
			throw new Exception("Delete error");
		}
	}
	@Override
	public HotelDto updateView(Long id){
		try{
			Hotels hotel = findHotelById(id);
			hotel.setView(hotel.getView()+1);
			return hotelDto(hotelsRepository.save(hotel));
		}catch (Exception ex){
			throw new Exception("Update view error");
		}
	}
	@Override
	public Hotels findHotelById(Long id){
		return hotelsRepository.findById(id).orElseThrow(() -> new NotFoundException("Not found hotel"));
	}
	@Override
	public HotelResponseDto filterHotel(HotelQueryParam hotelQueryParam){
		if(hotelQueryParam.getSortFiled()==null|| hotelQueryParam.getSortFiled().isEmpty()){
			hotelQueryParam.setSortFiled("nameOfHotel");
		}
		System.out.println(hotelQueryParam.getSortFiled());
		Sort sort = hotelQueryParam.getOrderBy().equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(hotelQueryParam.getSortFiled()).ascending()
				: Sort.by(hotelQueryParam.getSortFiled()).descending();
		Pageable pageable = PageRequest.of(hotelQueryParam.getPage(), hotelQueryParam.getPageSize(),sort);
		Page<Hotels> hotelsPage = hotelsRepository.filterHotel(
				hotelQueryParam.getStandard(),
				hotelQueryParam.getProvinceId(),
				hotelQueryParam.getKeyword(),
				pageable
		);
		System.out.println(hotelQueryParam.getStandard() + "" + hotelQueryParam.getProvinceId() + ""
				+ hotelQueryParam.getKeyword());
		List<Hotels> hotelsList =hotelsPage.getContent();
		System.out.println(hotelsList.size());
		List<HotelDto> content = hotelsList.stream().map(this::hotelDto).collect(Collectors.toList());
		HotelResponseDto hotelResponse = new HotelResponseDto();
		hotelResponse.setContent(content);
		hotelResponse.setPageNumber(hotelsPage.getNumber());
		hotelResponse.setPageSize(hotelsPage.getSize());
		hotelResponse.setTotalElements(hotelsPage.getTotalElements());
		hotelResponse.setTotalPages(hotelsPage.getTotalPages());
		hotelResponse.setLastPage(hotelsPage.isLast());
		return hotelResponse;
	}
}