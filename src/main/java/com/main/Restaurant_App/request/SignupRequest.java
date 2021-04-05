package com.main.Restaurant_App.request;

import java.util.Set;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

public @Data class SignupRequest {

  @NotEmpty(message = "{username.not.empty}")
  @Size(min = 3, max = 20)
  private String username;


  @NotEmpty(message = "{email.not.empty}")
  @Size(max = 50)

  @Email(message = "{email.not.valid}")
  private String email;
  @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
  private Set<String> role;

  @NotEmpty(message = "{password.not.empty}")
  @Size(min = 6, max = 40)
  private String password;
}
