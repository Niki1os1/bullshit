package com.vsu.coursework.service;

import com.vsu.coursework.model.ERole;
import com.vsu.coursework.model.Role;
import com.vsu.coursework.model.User;
import com.vsu.coursework.payload.dto.UserDto;
import com.vsu.coursework.repository.RoleRepository;
import com.vsu.coursework.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private UserDto mapToUserDto(User userById) {
        UserDto userDto = new UserDto();
        userDto.setId(userById.getId());
        userDto.setEmail(userById.getEmail());
        userDto.setUsername(userById.getUsername());
        userDto.setFirst_name(userById.getFirstname());
        userDto.setLast_name(userById.getLastname());

        Set<Role> roles = userById.getRoles();
        List<String> roleNames = new ArrayList<>();

        for (Role role : roles) {
            roleNames.add(role.getName().name());
        }

        userDto.setRoles(roleNames);

        return userDto;
    }

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

    public Long editUser(String userId, UserDto userDto) {
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
            return savedUser.getId();
        }

    public Long editRoleUserById(String userId, String[] roles) {
        User savedUser = getUserById(Long.parseLong(userId));

        savedUser.getRoles().removeIf(role -> !role.getName().equals(ERole.ROLE_STUDENT));

        if (roles != null && roles.length > 0) {
            for (String roleName : roles) {
                ERole roleEnum = ERole.valueOf(roleName);

                Optional<Role> existingRoleOptional = roleRepository.findByName(roleEnum);
                Role existingRole = existingRoleOptional.orElse(null);

                savedUser.getRoles().add(existingRole);
            }
        }

        userRepository.save(savedUser);

        return savedUser.getId();
    }

    public Long deleteUserById(String userId) {
        userRepository.deleteById(Long.parseLong(userId));
        return Long.parseLong(userId);
    }
}