package com.main.Restaurant_App.request;

import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public @Data class LoginRequest {
  @NotBlank
  private String username;

  @NotBlank
  private String password;


}

