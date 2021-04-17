package com.main.Restaurant_App.request;

import javax.validation.constraints.NotEmpty;
import lombok.Data;

public @Data class LoginRequest {

  // @NotEmpty(message = "{username.not.empty}")
  // private String username;
  @NotEmpty(message = "{email.not.empty}")
  private String email;

  @NotEmpty(message = "{password.not.empty}")
  private String password;



}

