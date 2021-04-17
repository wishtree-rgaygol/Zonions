package com.main.Restaurant_App.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public @Data class Restaurant implements Serializable {

  private static final long serialVersionUID = 1L;


  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int restid;
  @Column
  private String restname;
  @Column
  private String restaddress;
  @Column
  private String restphone;
  @Column
  private String openTime;
  @Column
  private String closeTime;
  @Column
  private String lastModified;
  @Column
  private boolean dining;
  @Column
  private boolean takeaway;
  @Column
  private boolean homedelivery;
  @Column
  private int visitCount;
  @Column
  private String createdTime;

}
