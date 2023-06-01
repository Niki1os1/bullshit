package com.vsu.coursework.controller;

import com.vsu.coursework.payload.dto.UserDto;
import com.vsu.coursework.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping(value = "/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/role")
    public List<String> getUserRoles() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        List<String> roles = new ArrayList<>();
        for (GrantedAuthority authority : authorities) {
            roles.add(authority.getAuthority());
        }
        return roles;
    }

    @GetMapping("/{userId}")
    public UserDto getUserById(@PathVariable String userId) {
        return userService.getUserDetails(userId);
    }


    @PutMapping("/edit-user/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public void editVideoMetadata(@RequestBody UserDto userDto, @PathVariable String userId){

        userService.editUser(userId, userDto);
    }
}

