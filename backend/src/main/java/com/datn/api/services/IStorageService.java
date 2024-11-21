package com.datn.api.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.stream.Stream;
@Service
public interface IStorageService {
    String storeFile(MultipartFile file);
    Stream<Path> loadAll();
    byte[] readFileContent(String fileName);
    void deleteAllFiles();
    Boolean removeFileByName(String fileName) throws IOException;
}