package com.datn.api.services;

import java.util.List;
import java.util.Optional;

import com.datn.api.enums.HotelDetailStatus;
import com.datn.api.exceptions.DuplicateRecordException;
import com.datn.api.exceptions.Exception;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import com.datn.api.entity.HotelDetails;
import com.datn.api.entity.Hotels;
import com.datn.api.entity.dto.HotelDetailDto;
import com.datn.api.entity.dto.HotelDetailResponse;
import com.datn.api.entity.dto.HotelDetailsRequest;
import com.datn.api.exceptions.NotFoundException;
import com.datn.api.repository.HotelsDetailsRepository;
import com.datn.api.repository.HotelsRepository;
import org.springframework.web.multipart.MultipartFile;

@Component
public class HotelDetailServiceImpl implements HotelDetailService{


    @Autowired
    private HotelsDetailsRepository hotelsDetailsRepository;

    @Autowired
    private HotelService hotelService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private  PartnerService partnerService;
    @Autowired
    private ImageStorageService storageService;
    @Override
    public HotelDetails createHotelsDetail(HotelDetailsRequest hotelDetailsRequest){
        try {
            Hotels hotel = hotelService.findHotelById(hotelDetailsRequest.getHotelId());
            HotelDetails hotelDetails = new HotelDetails();
            hotelDetails.setHotels(hotel);
            hotelDetails.setHighlights(hotelDetailsRequest.getHighlights());
            hotelDetails.setAreaOfRoom(hotelDetailsRequest.getAreaOfRoom());
            hotelDetails.setPhotosOfRoom(hotelDetailsRequest.getPhotosOfRoom());
            hotelDetails.setAmountOfRoom(hotelDetailsRequest.getAmountOfRoom());
            hotelDetails.setPriceOfRoom(hotelDetailsRequest.getPriceOfRoom());
            hotelDetails.setSizeOfBed(hotelDetailsRequest.getSizeOfBed());
            hotelDetails.setTypeOfBed(hotelDetailsRequest.getTypeOfBed());
            hotelDetails.setStatus(HotelDetailStatus.Available);
            hotelDetails.setTypeOfRoom(hotelDetailsRequest.getTypeOfRoom());
            return hotelsDetailsRepository.save(hotelDetails);
        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new Exception("Cập nhật thất bại");
        }
    }
    @Override
    public HotelDetails updateHotelsDetail(HotelDetailsRequest hotelDetailsRequest, Long id){
        try {
            partnerService.checkPartner(hotelDetailsRequest.getHotelId());
            Hotels hotel = hotelService.findHotelById(hotelDetailsRequest.getHotelId());
            HotelDetails hotelDetails = findHotelDetailById(id);
            hotelDetails.setHotels(hotel);
            hotelDetails.setHighlights(hotelDetailsRequest.getHighlights());
            hotelDetails.setAreaOfRoom(hotelDetailsRequest.getAreaOfRoom());
            hotelDetails.setPhotosOfRoom(hotelDetailsRequest.getPhotosOfRoom());
            hotelDetails.setAmountOfRoom(hotelDetailsRequest.getAmountOfRoom());
            hotelDetails.setPriceOfRoom(hotelDetailsRequest.getPriceOfRoom());
            hotelDetails.setSizeOfBed(hotelDetailsRequest.getSizeOfBed());
            hotelDetails.setTypeOfBed(hotelDetailsRequest.getTypeOfBed());
            hotelDetails.setStatus(hotelDetailsRequest.getStatus());
            hotelDetails.setTypeOfRoom(hotelDetailsRequest.getTypeOfRoom());
            return hotelsDetailsRepository.save(hotelDetails);
        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new Exception("Cập nhật thất bại");
        }
    }

    @Override
    public HotelDetailResponse getAllHotelDetail(Integer pageNumber, Integer pageSize, String sortDir, String sortBy){
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize,sort);

        Page<HotelDetails> hotels = hotelsDetailsRepository.getAll(pageable);

        List<HotelDetails> hotelDetailsList = hotels.getContent();


        List<HotelDetailDto> content = hotelDetailsList.stream().map(this::hotelDetailDto).toList();

        HotelDetailResponse hotelResponse = new HotelDetailResponse();
        hotelResponse.setContent(content);
        hotelResponse.setPageNumber(hotels.getNumber());
        hotelResponse.setPageSize(hotels.getSize());
        hotelResponse.setTotalElements(hotels.getTotalElements());
        hotelResponse.setTotalPages(hotels.getTotalPages());
        hotelResponse.setLastPage(hotels.isLast());
        return hotelResponse;
    }

    @Override
    public HotelDetails findHotelDetailById(Long id){
        Optional<HotelDetails> hotelDetails = hotelsDetailsRepository.findById(id);
        if(hotelDetails.isPresent()){
            return hotelDetails.get();
        }
        throw new NotFoundException("Not found hotelDetail with id"+id);
    }
    public HotelDetails dtoToHotelDetail(HotelDetailDto hotelDetailDto) {
        return this.modelMapper.map(hotelDetailDto, HotelDetails.class);
    }

    public HotelDetailDto hotelDetailDto(HotelDetails hotelDetails) {
        HotelDetailDto hotelDetailDto = modelMapper.map(hotelDetails, HotelDetailDto.class);
        hotelDetailDto.setHotelId(hotelDetails.getHotels().getHotel_ID());
        return hotelDetailDto;
    }

	@Override
	public boolean deleteHotelDetail(Long id) {
		try {
            HotelDetails hotelDetails = hotelsDetailsRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("not found"));
            hotelDetails.setDelete(true);
            hotelsDetailsRepository.save(hotelDetails);
            return true;
        }catch (Exception ex){
            System.out.println(ex.getMessage());
            throw new DuplicateRecordException("Delete error");
        }
	}

    @Override
    public HotelDetails updatePhotoOfRoom(Long id, MultipartFile file) {
        try {
            HotelDetails hotelDetails=findHotelDetailById(id);
            hotelDetails.setPhotosOfRoom(storageService.storeFile(file));
            hotelsDetailsRepository.save(hotelDetails);
            return hotelDetails;
        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new DuplicateRecordException("Update error");
        }
    }


}
