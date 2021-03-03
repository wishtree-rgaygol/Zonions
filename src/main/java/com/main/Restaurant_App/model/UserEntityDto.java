package com.main.Restaurant_App.model;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class UserEntityDto {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;


  @ManyToMany
  @Fetch(FetchMode.JOIN)
  @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
  private Set<Role> roles = new HashSet<>();


  public UserEntityDto() {
    super();
  }

  public UserEntityDto(Long id, @NotBlank @Size(max = 20) String username,
      @NotBlank @Size(max = 50) @Email String email, Set<Role> roles) {
    super();
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
  }



  public UserEntityDto(@NotBlank @Size(max = 20) String username,
      @NotBlank @Size(max = 50) @Email String email) {
    super();
    this.username = username;
    this.email = email;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }

  @Override
  public String toString() {
    return "RegistrationEntity [id=" + id + ", username=" + username + ", email=" + email
        + ", roles=" + roles + "]";
  }

}
