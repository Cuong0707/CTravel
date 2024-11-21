package com.datn.api.controller;


import java.util.ArrayList;
import java.util.List;

import com.datn.api.entity.dto.HotelDto;
import com.datn.api.exceptions.Exception;
import com.datn.api.exceptions.NotFoundException;
import com.datn.api.services.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.datn.api.entity.PhotosOfHotel;
import com.datn.api.exceptions.ApiResponse;
import com.datn.api.repository.HotelsRepository;
import com.datn.api.repository.PhotosOfHotelRepository;
import com.datn.api.services.ImageStorageService;

@RestController
@RequestMapping("/api/v1/photos-of-hotel")
public class PhotoOfHotelController {
    @Autowired
    PhotosOfHotelRepository photosOfHotelRepository;
    @Autowired
    ImageStorageService storageService;


   
    @Autowired
    HotelService hotelService;

    @GetMapping()


    @PostMapping("/hotels/{id}")
    public ApiResponse<?> createHotel(@PathVariable Long id, @RequestParam List<MultipartFile> files
    , @RequestBody HotelDto hotelDto){
      try {
          List<PhotosOfHotel> photosOfHotels = new ArrayList<>();
          for(int i=0;i<files.size();i++){
              PhotosOfHotel photosOfHotel = new PhotosOfHotel();
              photosOfHotel.setHotels(hotelService.findHotelById(id));
              photosOfHotel.setNameOfPhoto("Hinh"+i);
              photosOfHotel.setImage(storageService.storeFile(files.get(i)).toString());
              photosOfHotels.add(photosOfHotelRepository.save(photosOfHotel));
          }
          return ApiResponse.success(HttpStatus.OK,"success",photosOfHotels);
      }catch (Exception ex){
          throw new Exception("Create error");
      }
    }



    @PutMapping("/{id}")
    public ApiResponse<?> update(@PathVariable Long id, @RequestParam MultipartFile files){
       try {
           PhotosOfHotel photosOfHotel = photosOfHotelRepository.findById(id).orElseThrow(()->new NotFoundException("Not found photo of hotel with id"+id));
           photosOfHotel.setImage(storageService.storeFile(files).toString());
           return ApiResponse.success(HttpStatus.OK,"success",photosOfHotel);
       }catch (Exception ex){
           throw new Exception("Update error");
       }
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?>delete(@PathVariable Long id){
       try {
           photosOfHotelRepository.delete(photosOfHotelRepository.findById(id).orElseThrow(()->new NotFoundException("Not found photo of hotel with id"+id)));
        return ApiResponse.success(HttpStatus.OK,"success",null);
       }catch (Exception ex){
           throw new Exception("Delete error");
       }
    }
}
