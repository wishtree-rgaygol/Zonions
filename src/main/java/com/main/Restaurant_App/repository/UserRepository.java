package com.main.Restaurant_App.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.main.Restaurant_App.model.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  User findByUsername(String username);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);

  Boolean deleteByUsername(String username);

  User findByEmail(String email);

  /*
   * @Query("SELECT u.emailVerified FROM User u WHERE u.email = ?1") Boolean
   * findEmailVerifiedByEmail(String email);
   */
}
