package com.main.Restaurant_App.security.service;

import java.time.LocalTime;
import java.util.HashSet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.main.Restaurant_App.model.ERole;
import com.main.Restaurant_App.model.OTPTokenConfirm;
import com.main.Restaurant_App.model.Role;
import com.main.Restaurant_App.model.User;
import com.main.Restaurant_App.model.UserEntityDto;
import com.main.Restaurant_App.repository.RoleRepository;
import com.main.Restaurant_App.repository.TokenConfirmRepo;
import com.main.Restaurant_App.repository.UserDtoRepository;
import com.main.Restaurant_App.repository.UserRepository;
import com.main.Restaurant_App.request.SignupRequest;

@Service
public class AuthenticationService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private UserDtoRepository userDtoRepo;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private TokenConfirmRepo confirmationTokenRepository;

  private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

  LocalTime localTime = LocalTime.now();
  String time = localTime.toString();

  public User findByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public boolean existsByEmail(String email) {
    logger.info("Inside Exist By Email Method for checking mail id--", email);
    return userRepository.existsByEmail(email);
  }

  public User save(User user) {
    return userRepository.save(user);
  }

  public UserEntityDto save(UserEntityDto userDto) {
    return userDtoRepo.save(userDto);
  }

  public User saveUser(SignupRequest signUpRequest) {
    User user = new User();
    user.setUsername(signUpRequest.getUsername());;
    user.setEmail(signUpRequest.getEmail());
    user.setPassword(signUpRequest.getPassword());
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    final HashSet<Role> roles = new HashSet<Role>();
    roles.add(roleRepository.findByName(ERole.ROLE_USER));
    user.setRoles(roles);
    user.setCreatedAt(time);
    return userRepository.save(user);
  }

  public UserEntityDto saveUserEntityDto(SignupRequest signUpRequest) {
    UserEntityDto userDto = new UserEntityDto();
    userDto.setUsername(signUpRequest.getUsername());;
    userDto.setEmail(signUpRequest.getEmail());
    final HashSet<Role> roles = new HashSet<Role>();
    roles.add(roleRepository.findByName(ERole.ROLE_USER));
    userDto.setRoles(roles);
    return userDtoRepo.save(userDto);
  }

  public boolean changePassword(String email, String password) {
    User user = findByEmail(email);
    user.setPassword(passwordEncoder.encode(password));
    if (save(user) != null) {
      return true;
    }
    return false;
  }

  public OTPTokenConfirm createToken(User user) {
    OTPTokenConfirm confirmationToken = new OTPTokenConfirm(user);
    return confirmationTokenRepository.save(confirmationToken);
  }

  public OTPTokenConfirm findByConfirmationToken(String token) {
    return confirmationTokenRepository.findByConfirmationToken(token);
  }

  public void deleteToken(OTPTokenConfirm confirmationToken) {
    this.confirmationTokenRepository.delete(confirmationToken);
  }
}
