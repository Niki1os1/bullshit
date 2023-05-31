package com.vsu.coursework.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.DeleteObjectsRequest;
import com.amazonaws.services.s3.model.DeleteObjectsResult;
import com.amazonaws.services.s3.model.MultiObjectDeleteException;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Service implements FileService {

    public static final String BUCKET_NAME = "educational-platform-228";
    private  final AmazonS3Client awsS3Client;

    @Override
    public String uploadFile(MultipartFile file) {       //Upload file to AWS S3

        // Prepare a key
        var filenameExtension = StringUtils.getFilenameExtension(file.getOriginalFilename());

        var key = UUID.randomUUID() + "." + filenameExtension;
        var metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());

        try {
            awsS3Client.putObject(BUCKET_NAME, key, file.getInputStream(), metadata);
        } catch (IOException ioException) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "An Exception occured while uploading the file");
        }
        //awsS3Client.setObjectAcl(BUCKET_NAME, key, CannedAccessControlList.PublicRead);
        return awsS3Client.getResourceUrl(BUCKET_NAME, key);
    }

    public void deleteObjectsFromBucket(List<String> objectKeys) {
        DeleteObjectsRequest deleteObjectsRequest = new DeleteObjectsRequest(BUCKET_NAME)
                .withKeys(objectKeys.toArray(new String[0]));

        DeleteObjectsResult deleteObjectsResult = awsS3Client.deleteObjects(deleteObjectsRequest);

        // Проверка наличия ошибок при удалении
        if (deleteObjectsResult.getDeletedObjects().size() != objectKeys.size()) {
            throw new MultiObjectDeleteException(Collections.singleton(new MultiObjectDeleteException.DeleteError()), deleteObjectsResult.getDeletedObjects());
        }
    }

}

