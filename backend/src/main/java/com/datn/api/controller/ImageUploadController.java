package com.datn.api.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import com.datn.api.entity.ResponseObject;
import com.datn.api.services.ImageStorageService;

@Controller
@RequestMapping(path = "/api/v1/fileUpload")
public class ImageUploadController {
    @Autowired
    private ImageStorageService storageService;

    @GetMapping("/files/{fileName:.+}")
    public ResponseEntity<byte[]> readDetailFile(@PathVariable String fileName) {
        try {
            byte[] bytes = storageService.readFileContent(fileName);
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(bytes);
        } catch (Exception exception) {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("")
    public ResponseEntity<ResponseObject> getUploadedFiles() {
        try {
            List<String> urls = storageService.loadAll()
                    .map(path -> {
                        String urlPath = MvcUriComponentsBuilder.fromMethodName(ImageUploadController.class,
                                "readDetailFile", path.getFileName().toString()).build().toUri().toString();
                        return urlPath;
                    })
                    .collect(Collectors.toList());
            return ResponseEntity.ok(new ResponseObject("Ok", "Get images successfully", urls));
        } catch (Exception exception) {
            return ResponseEntity.ok(new
                    ResponseObject("Failed", "Get images failed", new String[]{}));
        }
    }

    @PostMapping("")
    public ResponseEntity<ResponseObject> uploadFile(@RequestParam("file") List<MultipartFile> file) {
        try {
            List<String> s = new ArrayList<>();
            for(int i=0;i<file.size();i++){
                String generatedFileName = storageService.storeFile(file.get(i));
                s.add(generatedFileName);
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("Ok", "Upload image successfully", s)
            );
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("Failed", exception.getMessage(), "")
            );
        }
    }
}