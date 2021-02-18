package com.main.Restaurant_App.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import com.fasterxml.jackson.annotation.JsonView;
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
  private int id;

  @Column(name = "Restaurant_Name")
  private String restName;

  @Lob
  @Column(name = "Address")
  private String address;

  @Column(name = "Phone_Number")
  private long phoneNo;

  @Column(name = "open_time")
  private String openTime;

  @Column(name = "close_time")
  private String closeTime;

  @Column(name = "status", columnDefinition = "boolean default false")
  private boolean isActive;

  @Column(name = "last_modified_on")
  private String lastModifiedTime;


  @Column
  @JsonView(View.FileInfo.class)
  private String name;

  @Column
  private String type;

  @Lob
  @Column
  private byte[] picByte;

}
