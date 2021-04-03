package com.main.Restaurant_App.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
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
  private boolean active;
  // @Column()
  // private Blob menuImage;
  @Column
  @JsonView(View.FileInfo.class)
  private String name;
  @Column
  private String type;
  @Lob
  @Column
  private byte[] picByte;

  @ManyToMany
  @JoinTable(name = "cuisine_manager", joinColumns = @JoinColumn(name = "restid"),
      inverseJoinColumns = @JoinColumn(name = "cuisine_id"))
  @Fetch(FetchMode.JOIN)
  private Set<Cuisine> cuisineManager = new HashSet<>();
}
