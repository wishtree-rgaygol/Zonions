package com.main.Restaurant_App.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.main.Restaurant_App.model.UserEntityDto;

public interface UserDtoRepository extends JpaRepository<UserEntityDto, Long> {
  UserEntityDto findByUsername(String username);

  Boolean deleteByUsername(String username);
}
