package com.vsu.coursework.service;

import com.vsu.coursework.model.User;
import com.vsu.coursework.payload.dto.UserDto;
import com.vsu.coursework.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private UserDto mapToUserDto(User userById) {
        UserDto userDto = new UserDto();
        userDto.setEmail(userById.getEmail());
        userDto.setUsername(userById.getUsername());
        userDto.setFirst_name(userById.getFirstname());
        userDto.setLast_name(userById.getLastname());

        return userDto;
    }

//    public List<UserDto> getUserById(Long userId) {
//        return userRepository.findById(userId).stream().map(this::mapToUserDto).toList();
//    }
//

    private User getUserById(Long userId){
        return userRepository.findById(userId)
                .orElseThrow(()-> new IllegalArgumentException("Cannot find user by id - " + userId));
    }

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(this::mapToUserDto).toList();
    }

    public UserDto getUserDetails(String userId) {
        User user = getUserById(Long.parseLong(userId));

        return mapToUserDto(user);
    }

    public void editUser(String userId, UserDto userDto) {
            User savedUser = getUserById(Long.parseLong(userId));

            if (savedUser != null) {
                if(userDto.getUsername()!=null&&!userDto.getUsername().isEmpty()&&!userDto.getUsername().equals(" "))
                    savedUser.setUsername(userDto.getUsername());
                if(userDto.getEmail()!=null&&!userDto.getEmail().isEmpty()&&!userDto.getEmail().equals(" "))
                    savedUser.setEmail(userDto.getEmail());
                if(userDto.getFirst_name()!=null&&!userDto.getFirst_name().isEmpty()&&!userDto.getFirst_name().equals(" "))
                    savedUser.setFirstname(userDto.getFirst_name());
                if(userDto.getLast_name()!=null&&!userDto.getLast_name().isEmpty()&&!userDto.getLast_name().equals(" "))
                    savedUser.setLastname(userDto.getLast_name());

                userRepository.save(savedUser);
            } else {
                throw new IllegalArgumentException("User not found");
            }
        }

//    public void deleteVideoInCourse(Long courseId){
//        ArrayList<String> keys = new ArrayList<>();
//        List<Video> deletedVideo= videoRepository.findByCourseId(courseId);
//        for(Video video : deletedVideo){
//            if(video.getVideoUrl()!=null) {
//                keys.add(extractFileNameFromUrl(video.getVideoUrl()));
//            }
//            if(video.getThumbnailUrl()!=null) {
//                keys.add(extractFileNameFromUrl(video.getThumbnailUrl()));
//            }
//        }
//        if(!keys.isEmpty()) {
//            s3Service.deleteObjectsFromBucket(keys);
//        }
//        videoRepository.deleteAll(deletedVideo);
//    }
//
//    public void deleteVideoById(){
//
//    }

}