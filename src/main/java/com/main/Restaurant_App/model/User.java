package com.main.Restaurant_App.model;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = "username"),
    @UniqueConstraint(columnNames = "email")})
public class User {
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

  @NotBlank
  @Size(max = 100)
  private String password;

  @Column(name = "Created_At")
  private String createdAt;

  private String source;

  @ManyToMany
  @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"),
      inverseJoinColumns = @JoinColumn(name = "role_id"))
  @Fetch(FetchMode.JOIN)
  private Set<Role> roles = new HashSet<>();

  public User() {

    super();
  }

  public User(String email, String password) {
    this.email = email;
    this.password = password;
  }



  public User(Long id, @NotBlank @Size(max = 50) @Email String email, Set<Role> roles) {
    super();
    this.id = id;
    this.email = email;
    this.roles = roles;
  }

  public User(Long id, @NotBlank @Size(max = 50) @Email String email,
      @NotBlank @Size(max = 100) String password) {
    super();
    this.id = id;
    this.email = email;
    this.password = password;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }

  @Override
  public String toString() {
    return "RegistrationEntity [id=" + id + ", email=" + email + ", password=" + password
        + ", roles=" + roles + "]";
  }

  public User(Long id, @NotBlank @Size(max = 50) @Email String email,
      @NotBlank @Size(max = 100) String password, Boolean emailVerified, Set<Role> roles) {
    super();
    this.id = id;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }
}
