package com.main.Restaurant_App.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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
import org.springframework.web.bind.annotation.RestController;
import com.main.Restaurant_App.model.ERole;
import com.main.Restaurant_App.model.Role;
import com.main.Restaurant_App.model.User;
import com.main.Restaurant_App.model.UserEntityDto;
import com.main.Restaurant_App.repository.RoleRepository;
import com.main.Restaurant_App.repository.UserDtoRepository;
import com.main.Restaurant_App.repository.UserRepository;
import com.main.Restaurant_App.request.LoginRequest;
import com.main.Restaurant_App.request.SignupRequest;
import com.main.Restaurant_App.response.JwtResponse;
import com.main.Restaurant_App.response.MessageResponse;
import com.main.Restaurant_App.security.jwt.JwtUtils;
import com.main.Restaurant_App.security.service.UserDetailsImpl;
import com.main.Restaurant_App.security.service.UserDetailsServiceImpl;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @Autowired
  UserDtoRepository dtoRepository;
  @Autowired
  UserDetailsServiceImpl service;

  private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

  // Sign-in method
  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest,
      HttpServletRequest request) {
    logger.info("Inside signin method");
    /*
     * int incorrectLogin = service.incorrectLogin(loginRequest.getUsername(),
     * loginRequest.getPassword());
     */

    Authentication authentication =
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
            loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
        .collect(Collectors.toList());
    UserEntityDto findByUsername = dtoRepository.findByUsername(loginRequest.getUsername());
    List<String> role = new ArrayList<>();
    UserEntityDto user = findByUsername;
    for (Role r : user.getRoles()) {
      role.add(r.getName().name());
      logger.info("Getting role......" + r.getName().name());
      roles = role;
    }
    @SuppressWarnings("unchecked")
    List<String> usernames = (List<String>) request.getSession().getAttribute("Login_Session");
    if (usernames == null) {
      usernames = new ArrayList<>();
      request.getSession().setAttribute("Login_Session", loginRequest.getUsername());
      request.getSession().setMaxInactiveInterval(10 * 60);

    }
    usernames.add(loginRequest.getUsername());
    request.getSession().setAttribute("Login_Session", usernames);

    request.getSession().setMaxInactiveInterval(10 * 60);

    logger.info("Total roles" + roles);
    return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(),
        userDetails.getEmail(), roles));
  }

  // Signup method
  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    logger.info("Inside signup method");
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      logger.warn("Logger Error: Username is already taken!");
      return ResponseEntity.badRequest()
          .body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      logger.warn("Logger Error: Email is already in use!");
      return ResponseEntity.badRequest()
          .body(new MessageResponse("Error: Email is already in use!"));
    }

    // Create new user's account
    User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
        encoder.encode(signUpRequest.getPassword()));

    UserEntityDto user1 = new UserEntityDto(signUpRequest.getUsername(), signUpRequest.getEmail());


    Set<String> strRoles = signUpRequest.getRole();

    Set<Role> roles = new HashSet<>();

    Role userRole = roleRepository.findByName(ERole.ROLE_USER);
    roles.add(userRole);

    user.setRoles(roles);
    user1.setRoles(roles);
    userRepository.save(user);
    dtoRepository.save(user1);
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



}


