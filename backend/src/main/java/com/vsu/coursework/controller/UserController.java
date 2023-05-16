package com.vsu.coursework.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping(value = "/api/user")
public class UserController {

    @GetMapping("/role")
    public String[] getUserRoles() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String[] roles = new String[authorities.size()];
        int index = 0;
        for (GrantedAuthority authority : authorities) {
            roles[index++] = authority.getAuthority();
        }
        return roles;
    }

}
