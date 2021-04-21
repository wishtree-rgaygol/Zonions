package com.main.Restaurant_App.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.main.Restaurant_App.model.ERole;
import com.main.Restaurant_App.model.Role;
import com.main.Restaurant_App.repository.RoleRepository;



@Service
@Transactional
public class RoleService {

  @Autowired
  RoleRepository rolRepository;

  public Role getByERole(ERole eRole) {
    return rolRepository.findByName(eRole);
  }

  public boolean existsERole(ERole eRole) {
    return rolRepository.existsByName(eRole);
  }

  public void save(Role role) {
    rolRepository.save(role);
  }
}
