package com.main.Restaurant_App.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.main.Restaurant_App.model.Cuisine;
import com.main.Restaurant_App.model.ECuisine;

public interface CuisineRepository extends JpaRepository<Cuisine, Integer> {
  Cuisine findByName(ECuisine name);
}
