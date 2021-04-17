package com.main.Restaurant_App.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.main.Restaurant_App.model.OTPTokenConfirm;

public interface TokenConfirmRepo extends JpaRepository<OTPTokenConfirm, Long> {

  OTPTokenConfirm findByConfirmationToken(String token);
}
