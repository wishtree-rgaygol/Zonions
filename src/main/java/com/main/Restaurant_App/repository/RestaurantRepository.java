package com.main.Restaurant_App.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.main.Restaurant_App.model.Restaurant;


public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
  // public Restaurant findByRestname(String restname);

  /* Optional<Restaurant> findByNameAndId(String name, int id); */

  public Restaurant findByRestname(String restname);



}
