package com.vsu.coursework.service;

public interface SecurityService {
    String findLoggedInUsername();
    void autoLogin(String username, String password);
}
