package com.vsu.coursework.service;

import com.vsu.coursework.config.WebMvcConfig;
import com.vsu.coursework.exception.FileStorageException;
import com.vsu.coursework.model.Course;
import com.vsu.coursework.payload.response.UploadFileResponse;
import com.vsu.coursework.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    private final Path fileStorageLocation;

    @Autowired
    public CourseService(WebMvcConfig fileStorageProperties, CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();


        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }

    public List<Course> getCoursesByUserId(Long userId) {
        return courseRepository.findByUserId(userId);
    }
    public UploadFileResponse saveCourse(Long userId, String category, String title, MultipartFile file) throws IOException {

        String originalFilename = file.getOriginalFilename();
        String fileExtension = StringUtils.getFilenameExtension(originalFilename);

        String randomFileName = UUID.randomUUID() + "." + fileExtension;

        String fileName = StringUtils.cleanPath(randomFileName);

        if(fileName.contains("..")) {
            throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
        }

        Path targetLocation = this.fileStorageLocation.resolve(fileName);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        String targetSubstring = "assets";

        int startIndex = targetLocation.toString().indexOf(targetSubstring);
        String trimmedPath = targetLocation.toString().substring(startIndex);

        var course = new Course();
        course.setUserId(userId);
        course.setCategory(category);
        course.setTitle(title);
        course.setIcon(trimmedPath);

        courseRepository.save(course);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    public void deleteCourse(Long id) throws IOException {
        Optional<Course> deletedCourse = courseRepository.findById(id);
        Path path = Paths.get(fileStorageLocation.normalize().toString());
        if (deletedCourse.get().getIcon()!=null) {
            Files.delete(Paths.get(String.valueOf(path.getParent().getParent().getParent().resolve(deletedCourse.get().getIcon()))));
        }
        courseRepository.deleteById(id);
    }
}
