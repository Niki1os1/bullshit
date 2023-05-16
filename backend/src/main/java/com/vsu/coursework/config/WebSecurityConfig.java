//package com.vsu.coursework.config;
//
//import com.vsu.coursework.security.jwt.JwtConfigurer;
//import com.vsu.coursework.security.jwt.JwtTokenProvider;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class WebSecurityConfig {
//
//    private final JwtTokenProvider jwtTokenProvider;
//
//    private static final String ADMIN_ENDPOINT = "/api/admin/**";
//    private static final String LOGIN_ENDPOINT = "/api/login";
//
//    private static final String REGISTRATION_ENDPOINT = "/api/registration";
//
//    public WebSecurityConfig(JwtTokenProvider jwtTokenProvider) {
//        this.jwtTokenProvider = jwtTokenProvider;
//    }
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//                .authorizeHttpRequests((auth) -> auth
//                        .anyRequest().authenticated()
//                        .antMatchers(LOGIN_ENDPOINT).permitAll()
//                        .antMatchers(ADMIN_ENDPOINT).hasRole("ADMIN")
//                        .antMatchers(REGISTRATION_ENDPOINT).hasRole("ADMIN")
//
//                )
//                .formLogin(form -> form
//                        .loginPage("/login")
//                        .permitAll()
//                )
//                .authenticationManager(new JwtTokenProvider());
////
////                .httpBasic().disable()
////                .csrf().disable()
////                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
////                .and()
////                .authorizeRequests()
////                .antMatchers(LOGIN_ENDPOINT).permitAll()
////                .antMatchers(ADMIN_ENDPOINT).hasRole("ADMIN")
////                .antMatchers(REGISTRATION_ENDPOINT).hasRole("ADMIN")
////                .anyRequest().authenticated()
////                .and()
////                .apply(new JwtConfigurer(jwtTokenProvider));
//
//        return http.build();
//    }
//}