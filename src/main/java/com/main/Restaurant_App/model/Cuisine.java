package com.main.Restaurant_App.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Cuisine {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;


  @Enumerated(EnumType.STRING)
  @Column
  private ECuisine name;


  public Cuisine() {
    super();
  }


  public Cuisine(ECuisine name) {
    super();
    this.name = name;
    System.out.println();
  }


  public Integer getId() {
    return id;
  }


  public void setId(Integer id) {
    this.id = id;
  }


  public ECuisine getName() {
    return name;
  }


  public void setName(ECuisine name) {
    this.name = name;
  }



}
