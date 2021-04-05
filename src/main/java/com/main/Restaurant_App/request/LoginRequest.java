package com.main.Restaurant_App.request;

import javax.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public @Data class LoginRequest {

  @NotEmpty(message = "{username.not.empty}")
  private String username;


  @NotEmpty(message = "{password.not.empty}")
  private String password;


}

