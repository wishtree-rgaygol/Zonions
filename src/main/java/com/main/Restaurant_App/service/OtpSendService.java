package com.main.Restaurant_App.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.main.Restaurant_App.security.service.SendEmailService;

@Service
public class OtpSendService {

  @Autowired
  private OTPGeneration otpGenerator;

  @Autowired
  private SendEmailService emailService;

  private static final Logger logger = LoggerFactory.getLogger(OtpSendService.class);

  public Boolean generateOtp(String key) {
    logger.info("Inside Generate OTP Service method for Key--", key);
    Integer otpValue = otpGenerator.generateOTP(key);
    if (otpValue == -1) {
      return false;
    }
    String message = "Your One Time Password is " + otpValue + ". This OTP is valid for 5 minutes.";

    return emailService.sendSimpleMail(key, "Password Reset", message);
  }

  public Boolean validateOTP(String key, Integer otpNumber) {
    Integer cacheOTP = otpGenerator.getOtp(key);
    if (cacheOTP.equals(otpNumber)) {
      otpGenerator.clearOTP(key);
      return true;
    }
    otpGenerator.clearOTP(key);
    return false;
  }
}
