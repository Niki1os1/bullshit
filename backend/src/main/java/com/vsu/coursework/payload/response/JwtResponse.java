package com.vsu.coursework.payload.response;


import java.util.List;

public class JwtResponse {
    private String token;
    private String type = "Bearer ";
    private Long id;
    private String username;
    private String email;
    private List<String> roles;

    public JwtResponse(List<String> roles, String token, Long id, String username, String email ) {
        this.roles = roles;
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;

    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public String getTokenType() {
        return type;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }
}