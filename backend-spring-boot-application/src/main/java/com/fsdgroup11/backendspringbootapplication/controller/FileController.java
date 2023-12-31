// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication.controller;

import com.fsdgroup11.backendspringbootapplication.helper.FileUploadHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
public class FileController {

    @Autowired
    private FileUploadHelper fileUploadHelper;

    @PostMapping("/upload-file")
    public ResponseEntity<String> uploadFile(@RequestParam("myFile") MultipartFile file){
        try {
            // if file is empty returning bad request
            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Request must contain a valid image file.");
            }
            // if file is not of type jpeg, jpg or png returning bad request
            else if (!file.getContentType().equals("image/jpeg") && !file.getContentType().equals("image/jpg") && !file.getContentType().equals("image/png")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Request must contain a valid image file of type jpg, jpeg or png.");
            }
            // calling fileUploadHelper
            boolean flag = fileUploadHelper.uploadFile(file);
            // if fileUploadHelper returns true i.e. image is successfully uploaded
            if(flag){
                return ResponseEntity.ok("File uploaded successfully.");
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        // If correct filetype was sent but something went wrong while running the code returning internal error
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong.");
    }

}
