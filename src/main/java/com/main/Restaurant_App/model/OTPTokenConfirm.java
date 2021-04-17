package com.main.Restaurant_App.model;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class OTPTokenConfirm {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "token_id")
  private long tokenId;

  @Column(name = "confirmation_token")
  private String confirmationToken;

  @Column(name = "created_date")
  private Date createdDate;

  @Column(name = "expiry_date")
  private Date expiryDate;

  @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
  @JoinColumn(nullable = false, name = "user_id")
  private User user;

  public OTPTokenConfirm() {}

  public OTPTokenConfirm(User user) {
    this.user = user;
    createdDate = new Date();
    expiryDate = calculateExpiryDate(10);
    confirmationToken = UUID.randomUUID().toString();
  }

  private Date calculateExpiryDate(int expiryTimeInMinutes) {
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(new Timestamp(calendar.getTime().getTime()));
    calendar.add(Calendar.MINUTE, expiryTimeInMinutes);
    return new Date(calendar.getTime().getTime());
  }


}
