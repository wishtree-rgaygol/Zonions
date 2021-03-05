package com.main.Restaurant_App.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.main.Restaurant_App.security.service.UserDetailsServiceImpl;


@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200")

public class UserController {

  @Autowired
  UserDetailsServiceImpl service;

  // @GetMapping("/all")
  // @PreAuthorize("hasRole('ADMIN')")
  // public List<RegistrationEntity> allAccess() {
  //
  // return userService.getAllUsers();
  // }
  /*
   * @GetMapping("/users") public List<UserEntityDto> getAll() {
   * System.out.println(service.getAllUsers()); return service.getAllUsers(); }
   * 
   * @GetMapping("/users/{id}") public ResponseEntity<UserEntityDto> getUserById(@PathVariable long
   * id) { return service.getUsertById(id); }
   * 
   * @PutMapping("/users/{id}") public UserEntityDto changeRole(@PathVariable long id, @RequestBody
   * User regi) { return service.changeRole(id, regi); }
   * 
   * @DeleteMapping("/users/{id}") public ResponseEntity<HttpStatus> deleteByUsername(@PathVariable
   * long id) {
   * 
   * return service.deleteByUsername(id);
   * 
   * }
   */


}
