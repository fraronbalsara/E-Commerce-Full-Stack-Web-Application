// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication.helper;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

@Component
public class FileUploadHelper {

    // React PUBLIC folder url where product images are stored
    public final String UPLOAD_DIR="..\\frontend-react-application\\public\\ProductImages";

    public boolean uploadFile(MultipartFile multipartFile){
        boolean f = false;
        // reading and writing file to required location
        try{
            InputStream is = multipartFile.getInputStream();
            byte data[] = new byte[is.available()];
            is.read(data);
            OutputStream os = new FileOutputStream(UPLOAD_DIR + File.separator + multipartFile.getOriginalFilename());
            os.write(data);
            os.flush();
            os.close();
            is.close();
            f = true;
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return f;
    }
}
