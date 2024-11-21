package com.datn.api.services;


import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.datn.api.entity.HotelDetails;
import com.datn.api.entity.Hotels;
import com.datn.api.entity.Partners;
import com.datn.api.entity.Users;
import com.datn.api.entity.dto.HotelDetailsRequest;
import com.datn.api.entity.dto.HotelRequest;
import com.datn.api.entity.dto.PartnerQueryParam;
import com.datn.api.entity.dto.PartnerRequest;
import com.datn.api.entity.dto.PartnerResponseDto;
import com.datn.api.entity.dto.PartnerV2Request;
import com.datn.api.entity.dto.PartnersDto;
import com.datn.api.entity.dto.UpdatePartnerAdminRequest;
import com.datn.api.enums.HotelDetailStatus;
import com.datn.api.enums.HotelStatus;
import com.datn.api.enums.PartnerStatus;
import com.datn.api.enums.Role;
import com.datn.api.exceptions.DuplicateRecordException;
import com.datn.api.exceptions.Exception;
import com.datn.api.exceptions.NotFoundException;
import com.datn.api.repository.DistrictRepository;
import com.datn.api.repository.HotelsDetailsRepository;
import com.datn.api.repository.HotelsRepository;
import com.datn.api.repository.PartnerRepository;
import com.datn.api.repository.ServicesRepository;
import com.datn.api.repository.UsersRepository;
@Service
public class PartnerServiceImpl implements PartnerService{
    @Autowired
    UsersRepository usersRepository;
    @Autowired
    PartnerRepository partnerRepository;
    @Autowired
    HotelsRepository hotelsRepository;
    @Autowired
    ServicesRepository servicesRepository;
    @Autowired
    IStorageService iStorageService;
    @Autowired
    DistrictRepository districtRepository;
    @Autowired
    UsersService usersService;
    @Autowired
    HotelsDetailsRepository hotelsDetailsRepository;
    @Autowired
    ModelMapper modelMapper;

    @Override
    public PartnerResponseDto getAllPartners(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<Partners> partners = partnerRepository.findAll(pageable);

        List<Partners> list = partners.getContent();

        List<PartnersDto> content = list.stream().map(this::partnerDto)
                .collect(Collectors.toList());

        PartnerResponseDto responseDto = new PartnerResponseDto();
        responseDto.setContent(content);
        responseDto.setPageNumber(partners.getNumber());
        responseDto.setPageSize(partners.getSize());
        responseDto.setTotalElements(partners.getTotalElements());
        responseDto.setTotalPages(partners.getTotalPages());
        responseDto.setLastPage(partners.isLast());

        return responseDto;
    }

    @Override
    public Partners findPartnerById(String id){
       return partnerRepository.findById(id).orElseThrow(()-> new NotFoundException("Not found partner with id "+id));
    }
    @Override
    public Partners create(PartnerRequest partnerRequest, MultipartFile image, MultipartFile license){
        String imageFileName = iStorageService.storeFile(image);
        String licenseFileName = iStorageService.storeFile(license);
        if(!checkEmail(partnerRequest.getEmail())){
            throw new DuplicateRecordException("Email already exists");
        }else if( partnerRepository.findByUser(UserCurrent.get()).orElse(null)!=null){
            throw new DuplicateRecordException("Partner already exists");
        }
       try {
           Partners partner = new Partners();
           partner.setPartnerId(UUID.randomUUID().toString().substring(0,36));
           partner.setUser(UserCurrent.get());
           partner.setServices(servicesRepository.findById(partnerRequest.getServiceId()).orElseThrow(()-> new RuntimeException("Not found serviceId"+partnerRequest.getServiceId())));
           partner.setEmail(partnerRequest.getEmail());
           partner.setNameOfCompany(partnerRequest.getNameOfCompany());
           partner.setTaxCode(partnerRequest.getTaxCode());
           partner.setAvatarOfCompany(imageFileName);
           partner.setWebsite(partnerRequest.getWebsite());
           partner.setBusinessLicense(licenseFileName);
           partner.setStatus(PartnerStatus.pending);
           return partnerRepository.save(partner);
       }catch (Exception e){
           throw new Exception("Create partner error "+e.getMessage());
       }
    }

    @Override
    @Transactional
    public boolean createV2(PartnerV2Request partnerV2Request, MultipartFile image, MultipartFile license, MultipartFile[] lsHotelDetailImages) {
        try {
             Partners partners = this.create(partnerV2Request.getPartnerRequest(), image, license);
             Hotels hotels = this.createHotel(partnerV2Request.getHotelRequest(), partners);
             List<HotelDetailsRequest> lsHotelDetailRequest = partnerV2Request.getLsHotelDetailsRequests();
             for(int i = 0 ; i< lsHotelDetailRequest.size(); i++){
                 String filename = "";
                 if(i < lsHotelDetailImages.length){
                     filename = iStorageService.storeFile(lsHotelDetailImages[i]);
                 }
                 HotelDetailsRequest hotelDetail = lsHotelDetailRequest.get(i);
                 hotelDetail.setPhotosOfRoom(filename);
                 hotelDetail.setHotelId(hotels.getHotel_ID());
                 this.createHotelsDetail(hotelDetail);
             }
        } catch (Exception ex){
            ex.printStackTrace();
            System.out.println(ex.getMessage());
            return false;
        }
        return true;
    }

    @Override
    public Partners updateForAdmin(String id,UpdatePartnerAdminRequest updatePartnerAdminRequest){
        Partners partnerCheck = findPartnerById(id);
        Users user = usersService.findByIdUser(partnerCheck.getUser().getUserID());
        try {
			if (updatePartnerAdminRequest.getStatus().equals(PartnerStatus.success)) {
                partnerCheck.setStatus(PartnerStatus.success);
                user.setRole(Role.partner);
                usersService.updateStatusAndRoleForAdmin(user);
                Hotels hotels= hotelsRepository.findHotelsByPartner(partnerCheck).orElseThrow(()->new NotFoundException("not found partner"));
                hotels.setStatus(HotelStatus.Available);
                hotelsRepository.save(hotels);
			} else if (updatePartnerAdminRequest.getStatus().equals(PartnerStatus.refused)) {
				partnerCheck.setStatus(PartnerStatus.refused);
			} else if (updatePartnerAdminRequest.getStatus().equals(PartnerStatus.pending)) {
                partnerCheck.setStatus(PartnerStatus.pending);
            }else {
                partnerCheck.setStatus(partnerCheck.getStatus());
            }
            return partnerRepository.save(partnerCheck);
        }catch (Exception e){
            throw new Exception("Update partner error "+e.getMessage());
        }
    }
    public boolean checkEmail(String email){
        var userCheck = usersRepository.findByEmailAndPasswordNotNull(email).orElse(null);
        var partnerCheck = partnerRepository.findByEmail(email).orElse(null);
        return userCheck == null && partnerCheck == null;
    }
    @Override
    public boolean checkPartner(Long hotelId){
        Partners partners= findPartnerByUser(UserCurrent.get());
        return hotelsRepository.checkHotelOfPartner(hotelId, partners) != null;
    }
    @Override
    public Partners findPartnerByUser(Users user){
        return partnerRepository.findByUser(user).orElseThrow(()->new NotFoundException("Not found partner with id"+user.getUserID()));
    }
    public PartnersDto partnerDto(Partners partners) {
        return modelMapper.map(partners, PartnersDto.class);
    }
    public Hotels createHotel(HotelRequest hotelRequest, Partners partners) throws Exception {
        try{
            Hotels hotels = new Hotels();
            hotels.setDistricts(districtRepository.findById(hotelRequest.getDistrictId()).orElseThrow());
            hotels.setPartner(partners);
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

    public HotelDetails createHotelsDetail(HotelDetailsRequest hotelDetailsRequest){
        try {
            Hotels hotel = hotelsRepository.findById(hotelDetailsRequest.getHotelId()).orElseThrow(() -> {
                throw new NotFoundException("Hotel not found");
            });
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
    public PartnerResponseDto filterPartner(PartnerQueryParam partnerQueryParam){
        if(partnerQueryParam.getSortFiled()==null|| partnerQueryParam.getSortFiled().isEmpty()){
            partnerQueryParam.setSortFiled("taxCode");
        }
        Sort sort = partnerQueryParam.getOrderBy().equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(partnerQueryParam.getSortFiled()).ascending()
                : Sort.by(partnerQueryParam.getSortFiled()).descending();
        Pageable pageable = PageRequest.of(partnerQueryParam.getPage(), partnerQueryParam.getPageSize(),sort);
        Page<Partners> partnersPage = partnerRepository.filterPartner(
                partnerQueryParam.getStatus(),
                pageable
        );
        List<Partners> partnersList =partnersPage.getContent();
        List<PartnersDto> content = partnersList.stream().map(this::partnerDto).collect(Collectors.toList());
        PartnerResponseDto partnerResponseDto = new PartnerResponseDto();
        partnerResponseDto.setContent(content);
        partnerResponseDto.setPageNumber(partnersPage.getNumber());
        partnerResponseDto.setPageSize(partnersPage.getSize());
        partnerResponseDto.setTotalElements(partnersPage.getTotalElements());
        partnerResponseDto.setTotalPages(partnersPage.getTotalPages());
        partnerResponseDto.setLastPage(partnersPage.isLast());
        return partnerResponseDto;
    }
}
