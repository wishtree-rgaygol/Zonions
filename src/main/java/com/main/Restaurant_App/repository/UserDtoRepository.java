package com.main.Restaurant_App.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.main.Restaurant_App.model.UserEntityDto;

public interface UserDtoRepository extends JpaRepository<UserEntityDto, Long> {
  Optional<UserEntityDto> findByUsername(String username);

  Boolean deleteByUsername(String username);
}
