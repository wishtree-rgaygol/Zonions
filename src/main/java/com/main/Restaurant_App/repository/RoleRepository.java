package com.main.Restaurant_App.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.main.Restaurant_App.model.ERole;
import com.main.Restaurant_App.model.Role;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Role findByName(ERole name);

  boolean existsByName(ERole name);
}
