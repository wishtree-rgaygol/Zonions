package com.main.Restaurant_App.controller;

import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.main.Restaurant_App.request.EmailVerification;
import com.main.Restaurant_App.response.ApiResponse;
import com.main.Restaurant_App.security.service.AuthenticationService;
import com.main.Restaurant_App.service.OtpSendService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/otp")
public class OTPController {

  @Autowired
  private OtpSendService otpService;

  @Autowired
  private AuthenticationService authService;

  private static final Logger logger = LoggerFactory.getLogger(OTPController.class);

  @PostMapping("/generateotp")
  public ResponseEntity<?> generateOtp(@Valid @RequestBody EmailVerification emailRequest)
      throws Exception {
    logger.info("Inside Generate OTP MEthod for Email ID--", emailRequest.getEmail());
    if (authService.existsByEmail(emailRequest.getEmail())) {
      if (otpService.generateOtp(emailRequest.getEmail())) {
        return ResponseEntity.ok(new ApiResponse(true, "Otp sent on email account"));
      } else {
        throw new Exception("Unable to send OTP. try again");
      }
    } else {
      throw new Exception("Email is not associated with any account.");
    }
  }

  @PostMapping("/validateotp")
  public ResponseEntity<?> validateOtp(@Valid @RequestBody EmailVerification emailRequest) {
    if (emailRequest.getOtpNo() != null) {
      if (otpService.validateOTP(emailRequest.getEmail(), emailRequest.getOtpNo())) {
        return ResponseEntity.ok(new ApiResponse(true, "OTP verified successfully"));
      }
    }
    return ResponseEntity.badRequest().body("Invalid OTP");
  }
}
