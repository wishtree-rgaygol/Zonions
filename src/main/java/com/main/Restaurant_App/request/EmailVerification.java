package com.main.Restaurant_App.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailVerification {

  @NotBlank
  @Email
  private String email;

  private Integer otpNo;
}
