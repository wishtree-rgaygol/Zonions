package com.main.Restaurant_App.security.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import com.main.Restaurant_App.model.ERole;
import com.main.Restaurant_App.model.Role;
import com.main.Restaurant_App.model.User;
import com.main.Restaurant_App.model.UserEntityDto;
import com.main.Restaurant_App.repository.RoleRepository;
import com.main.Restaurant_App.repository.UserDtoRepository;
import com.main.Restaurant_App.repository.UserRepository;



@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

  @Autowired
  UserRepository registrationRepository;

  @Autowired
  UserDtoRepository dtoRepo;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder pcode;

  boolean Epass;
  int loginCount = 0;
  boolean login;

  public List<UserEntityDto> getAllUsers() {
    List<UserEntityDto> list1 = dtoRepo.findAll();

    return list1;
  }

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String email) {
    User user = registrationRepository.findByEmail(email);

    return UserDetailsImpl.build(user);
  }

  private List<GrantedAuthority> getGrantedAuthorities(Set<Role> roles) {
    List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

    for (Role rolesname : roles) {
      authorities.add(new SimpleGrantedAuthority("ROLE_" + rolesname.getName()));
    }

    return authorities;
  }

  public ResponseEntity<UserEntityDto> getUsertById(long id) {

    Optional<UserEntityDto> user = dtoRepo.findById(id);
    if (user.isPresent()) {
      return new ResponseEntity<UserEntityDto>(user.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  public UserEntityDto changeRole(@PathVariable long id, @RequestBody User resm) {
    this.logger.info("User Object---" + resm);
    String st = "ROLE_ADMIN";
    String st1 = "ROLE_USER";
    resm.setPassword("*****");
    Optional<User> restdata = registrationRepository.findById(id);

    UserEntityDto entity =
        new UserEntityDto(resm.getId(), resm.getUsername(), resm.getEmail(), resm.getRoles());
    this.logger.info("Restaurant Data--" + restdata);
    this.logger.info("User Entity--" + entity);
    if (restdata.isPresent()) {
      this.logger.info("inside outer if" + resm.getRoles());

      if (!resm.getRoles().isEmpty()) {
        this.logger.info("inside inner if" + resm.getRoles());


        Set<Role> role = new HashSet<Role>();
        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN);
        role.add(adminRole);
        entity.setRoles(role);
        this.logger.info("Getting roles---" + entity.getRoles());


      }

    }

    return dtoRepo.save(entity);
  }


  public ResponseEntity<HttpStatus> deleteByUsername(@PathVariable long id) {
    try {

      dtoRepo.deleteById(id);
      registrationRepository.deleteById(id);

      return new ResponseEntity<HttpStatus>(HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public int incorrectLogin(String username, String password) {
    User user = registrationRepository.findByUsername(username);
    if (user != null) {
      login = pcode.matches(password, user.getPassword());
    }
    if (login == true) {
      loginCount = 0;
    } else {
      loginCount++;
    }
    System.out.println("Login count-" + loginCount);
    return loginCount;
  }

  /*
   * @Transactional public boolean isAccountVerified(String email) { boolean isVerified =
   * registrationRepository.findEmailVerifiedByEmail(email); return isVerified; }
   */

}
