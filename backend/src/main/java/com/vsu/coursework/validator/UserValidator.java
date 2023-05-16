//package com.vsu.coursework.validator;
//
//import com.vsu.coursework.model.User;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Component;
//import org.springframework.validation.Errors;
//import org.springframework.validation.ValidationUtils;
//import org.springframework.validation.Validator;
//
//@Component
//@RequiredArgsConstructor
//public class UserValidator implements Validator {
//
//    private final UserService userService;
//
//    @Override
//    public boolean supports(Class<?> clazz) {
//        return User.class.equals(clazz);
//    }
//
//    @Override
//    public void validate(Object target, Errors errors) {
//        User user = (User) target;
//
//        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "login", "Required");
//        if(user.getLogin().length() < 8 || user.getLogin().length() > 32){
//            errors.rejectValue("login", "Login must be between 8 and 32 characters.");
//        }
//        if(userService.findUserByLogin(user.getLogin())!=null){
//            errors.rejectValue("login", "Such login already exists.");
//        }
//
//        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "Required");
//        if(user.getPassword().length() <8 || user.getPassword().length() > 32){
//            errors.rejectValue("password", "Password must be over 8 characters.");
//        }
//        if(!user.getConfirmPassword().equals(user.getPassword())){
//            errors.rejectValue("confirmPassword", "Password don't match.");
//        }
//    }
//}
