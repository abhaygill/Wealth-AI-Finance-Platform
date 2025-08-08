package com.wealth.finance.controller;

import com.wealth.finance.dto.UserRegistrationRequest;
import com.wealth.finance.dto.LoginRequest;
import com.wealth.finance.dto.AuthResponse;
import com.wealth.finance.model.User;
import com.wealth.finance.security.JwtTokenProvider;
import com.wealth.finance.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Authentication management APIs")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @PostMapping("/register")
    @Operation(summary = "Register a new user", description = "Create a new user account")
    public ResponseEntity<AuthResponse> registerUser(@Valid @RequestBody UserRegistrationRequest registrationRequest) {
        // Create new user
        User user = new User();
        user.setUsername(registrationRequest.getUsername());
        user.setEmail(registrationRequest.getEmail());
        user.setPassword(registrationRequest.getPassword());
        
        User savedUser = userService.registerUser(user);
        
        // Generate JWT token
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(registrationRequest.getUsername(), registrationRequest.getPassword())
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        
        AuthResponse response = new AuthResponse(jwt, savedUser.getId(), savedUser.getUsername(), savedUser.getEmail());
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/login")
    @Operation(summary = "Login user", description = "Authenticate user and return JWT token")
    public ResponseEntity<AuthResponse> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsernameOrEmail(), loginRequest.getPassword())
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        
        User user = userService.findByUsernameOrEmail(loginRequest.getUsernameOrEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        AuthResponse response = new AuthResponse(jwt, user.getId(), user.getUsername(), user.getEmail());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/profile")
    @Operation(summary = "Get user profile", description = "Get current user profile information")
    public ResponseEntity<User> getProfile(@RequestParam String userId) {
        User user = userService.findById(userId);
        // Don't return password
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }
} 