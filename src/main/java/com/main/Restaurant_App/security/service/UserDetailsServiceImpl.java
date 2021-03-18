package com.main.Restaurant_App.security.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
  /*
   * @Autowired UserRepository userRepository;
   * 
   * @Override
   * 
   * @Transactional public UserDetails loadUserByUsername(String username) throws
   * UsernameNotFoundException { User user = userRepository.findByUsername(username) .orElseThrow(()
   * -> new UsernameNotFoundException("User Not Found with username: " + username));
   * 
   * return UserDetailsImpl.build(user); }
   */


  @Autowired
  UserRepository registrationRepository;

  @Autowired
  UserDtoRepository dtoRepo;

  @Autowired
  RoleRepository roleRepository;

  public List<UserEntityDto> getAllUsers() {
    List<UserEntityDto> list1 = dtoRepo.findAll();

    return list1;
  }

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = registrationRepository.findByUsername(username);

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
    System.out.println("resmmm===" + resm);
    String st = "ROLE_ADMIN";
    String st1 = "ROLE_USER";
    resm.setPassword("*****");
    Optional<User> restdata = registrationRepository.findById(id);

    UserEntityDto entity =
        new UserEntityDto(resm.getId(), resm.getUsername(), resm.getEmail(), resm.getRoles());
    System.out.println(restdata);
    System.out.println(entity);
    if (restdata.isPresent()) {

      System.out.println("inside outer if");
      System.out.println(resm.getRoles());
      if (!resm.getRoles().isEmpty()) {
        System.out.println("inside inner if");
        System.out.println(resm.getRoles());
        Set<Role> role = new HashSet<Role>();
        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN);
        role.add(adminRole);
        entity.setRoles(role);
        System.out.println(entity.getRoles());

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

}
