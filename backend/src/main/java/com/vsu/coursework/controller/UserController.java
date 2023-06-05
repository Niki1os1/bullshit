package com.vsu.coursework.controller;

import com.vsu.coursework.payload.dto.UserDto;
import com.vsu.coursework.service.UserService;
import lombok.RequiredArgsConstructor;
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

    @PutMapping("/edit-user/{userId}")
    public Long editUser(@PathVariable String userId, @RequestBody UserDto userDto){
        return userService.editUser(userId, userDto);
    }

    @PutMapping("/edit-user/{userId}/role")
    public Long editRoleUserById(@PathVariable String userId, @RequestBody String[] role){
        return userService.editRoleUserById(userId, role);
    }

    @GetMapping("/{userId}")
    public UserDto getUserById(@PathVariable String userId) {
        return userService.getUserDetails(userId);
    }

    @DeleteMapping("/{userId}")
    public Long deleteUserById(@PathVariable String userId) {
        return userService.deleteUserById(userId);
    }

    @GetMapping("/all")
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }



}

