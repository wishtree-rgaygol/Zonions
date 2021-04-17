package com.main.Restaurant_App.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class SendEmailService {

  @Autowired
  private JavaMailSender javaMailSender;

  public void sendMail(String userEmail, String confirmationToken) {
    SimpleMailMessage mailMessage = new SimpleMailMessage();
    mailMessage.setTo(userEmail);
    mailMessage.setSubject("Account Activation!");
    mailMessage.setText("To confirm your account, please click here : "
        + "http://localhost:8080/auth/confirmaccount?token=" + confirmationToken
        + "   Note: This link will expire after 10 minutes.");
    javaMailSender.send(mailMessage);
  }

  public boolean sendSimpleMail(String to, String sub, String body) {
    SimpleMailMessage mailMessage = new SimpleMailMessage();
    mailMessage.setTo(to);
    mailMessage.setSubject(sub);
    mailMessage.setText(body);
    Boolean isSent = false;
    try {
      javaMailSender.send(mailMessage);
      isSent = true;
    } catch (Exception e) {
    }

    return isSent;
  }
}
