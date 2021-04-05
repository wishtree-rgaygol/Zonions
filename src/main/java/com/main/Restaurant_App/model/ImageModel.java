package com.main.Restaurant_App.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

@Entity
public @Data class ImageModel {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  @JsonView(View.FileInfo.class)
  @Column(name = "menu_type")
  private String name;

  @Column(name = "mimetype")
  private String mimetype;

  @Lob
  @Column(name = "pic")
  private byte[] pic;

  private String type;

  @Column(name = "restid")
  private int restid;
}

