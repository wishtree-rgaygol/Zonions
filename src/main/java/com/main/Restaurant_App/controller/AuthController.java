package com.main.Restaurant_App.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.main.Restaurant_App.model.OTPTokenConfirm;
import com.main.Restaurant_App.model.User;
import com.main.Restaurant_App.model.UserEntityDto;
import com.main.Restaurant_App.repository.RoleRepository;
import com.main.Restaurant_App.repository.UserDtoRepository;
import com.main.Restaurant_App.repository.UserRepository;
import com.main.Restaurant_App.request.LoginRequest;
import com.main.Restaurant_App.request.SignupRequest;
import com.main.Restaurant_App.response.ApiResponse;
import com.main.Restaurant_App.response.JwtResponse;
import com.main.Restaurant_App.response.MessageResponse;
import com.main.Restaurant_App.security.jwt.JwtUtils;
import com.main.Restaurant_App.security.service.AuthenticationService;
import com.main.Restaurant_App.security.service.SendEmailService;
import com.main.Restaurant_App.security.service.UserDetailsImpl;
import com.main.Restaurant_App.security.service.UserDetailsServiceImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserDetailsServiceImpl userDetailsService;

  @Autowired
  private SendEmailService emailSenderService;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @Autowired
  AuthenticationService authService;

  @Autowired
  UserDtoRepository dtoRepository;
  @Autowired
  UserDetailsServiceImpl service;

  private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

  // Sign-in method
  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest,
      HttpServletRequest request) throws Exception {
    logger.info("Inside signin method");

    Authentication authentication =
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
            loginRequest.getEmail(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
        .collect(Collectors.toList());
    UserEntityDto findByEmail = dtoRepository.findByEmail(loginRequest.getEmail());
    List<String> role = new ArrayList<>();
    /*
     * UserEntityDto user = findByEmail; for (Role r : user.getRoles()) {
     * role.add(r.getName().name()); logger.info("Getting role......" + r.getName().name()); roles =
     * role; }
     */
    @SuppressWarnings("unchecked")
    List<String> usernames = (List<String>) request.getSession().getAttribute("Login_Session");
    if (usernames == null) {
      usernames = new ArrayList<>();
      request.getSession().setAttribute("Login_Session", loginRequest.getEmail());
      request.getSession().setMaxInactiveInterval(10 * 60);

    }
    usernames.add(loginRequest.getEmail());
    request.getSession().setAttribute("Login_Session", usernames);

    request.getSession().setMaxInactiveInterval(10 * 60);

    return ResponseEntity
        .ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), roles));
  }

  // Signup method
  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    logger.info("Inside signup method");

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      logger.warn("Logger Error: Email is already in use!");
      return ResponseEntity.badRequest()
          .body(new MessageResponse("Error: Email is already in use!"));
    }

    User user = authService.saveUser(signUpRequest);
    UserEntityDto userDto = authService.saveUserEntityDto(signUpRequest);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  @GetMapping("/users")
  public List<UserEntityDto> getAll() {
    logger.info("Inside get all role method");
    System.out.println(service.getAllUsers());
    return service.getAllUsers();
  }

  @GetMapping("/users/{id}")
  public ResponseEntity<UserEntityDto> getUserById(@PathVariable long id) {
    logger.info("Inside get role by id method");
    return service.getUsertById(id);
  }

  @PutMapping("/users/{id}")
  public UserEntityDto changeRole(@PathVariable long id, @RequestBody User regi) {
    logger.info("Inside change role method");
    return service.changeRole(id, regi);
  }

  @DeleteMapping("/users/{id}")
  public ResponseEntity<HttpStatus> deleteByUsername(@PathVariable long id) {
    logger.info("Inside delete role method");
    return service.deleteByUsername(id);

  }

  @GetMapping("/confirmaccount")
  public ResponseEntity<?> getMethodName(@RequestParam("token") String token) throws Exception {

    OTPTokenConfirm confirmationToken = authService.findByConfirmationToken(token);

    if (confirmationToken == null) {
      throw new Exception("Invalid token");
    }

    User user = confirmationToken.getUser();
    Calendar calendar = Calendar.getInstance();

    if ((confirmationToken.getExpiryDate().getTime() - calendar.getTime().getTime()) <= 0) {
      return ResponseEntity.badRequest()
          .body("Link expired. Generate new link from http://localhost:4200/login");
    }

    /* user.setEmailVerified(true); */
    authService.save(user);
    return ResponseEntity.ok("Account verified successfully!");
  }

  /*
   * @PostMapping("/sendemail") public ResponseEntity<?> sendVerificationMail(@Valid @RequestBody
   * EmailVerification emailRequest) throws Exception { if
   * (authService.existsByEmail(emailRequest.getEmail())) { if
   * (userDetailsService.isAccountVerified(emailRequest.getEmail())) { throw new
   * Exception("Email is already verified"); } else { User user =
   * authService.findByEmail(emailRequest.getEmail()); OTPTokenConfirm token =
   * authService.createToken(user); emailSenderService.sendMail(user.getEmail(),
   * token.getConfirmationToken()); return ResponseEntity .ok(new ApiResponse(true,
   * "Verification link is sent on your mail id")); } } else { throw new
   * Exception("Email is not associated with any account"); } }
   */

  @PostMapping("/resetpassword")
  public ResponseEntity<?> resetPassword(@Valid @RequestBody LoginRequest loginRequest)
      throws Exception {
    logger.info("Inside Reset Password Method");
    if (authService.existsByEmail(loginRequest.getEmail())) {
      if (authService.changePassword(loginRequest.getEmail(), loginRequest.getPassword())) {
        return ResponseEntity.ok(new ApiResponse(true, "Password changed successfully"));
      } else {
        throw new Exception("Unable to change password. Try again!");
      }
    } else {
      throw new Exception("Username not found...");
    }
  }



}


