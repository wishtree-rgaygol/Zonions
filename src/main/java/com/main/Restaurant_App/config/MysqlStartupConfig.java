package com.main.Restaurant_App.config;

import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.main.Restaurant_App.model.ERole;
import com.main.Restaurant_App.model.Role;
import com.main.Restaurant_App.model.User;
import com.main.Restaurant_App.model.UserEntityDto;
import com.main.Restaurant_App.repository.RoleRepository;
import com.main.Restaurant_App.repository.UserDtoRepository;
import com.main.Restaurant_App.repository.UserRepository;

@Component
public class MysqlStartupConfig implements ApplicationListener<ContextRefreshedEvent> {
  private static boolean alreadySetup = false;

  @Autowired
  UserRepository registrationRepository;


  @Autowired
  UserDtoRepository registrationRepositorydto;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;


  @Override
  public void onApplicationEvent(final ContextRefreshedEvent event) {
    if (alreadySetup) {
      return;
    }

    Role adminrole = createRoleIfNotFound(ERole.ROLE_ADMIN);
    Role userrole = createRoleIfNotFound(ERole.ROLE_USER);
    createUserIfNotFound("Admin123", "admin@gmail.com", Set.of(adminrole));
    createUserDtoIfNotFound("Admin123", "admin@gmail.com", Set.of(adminrole));
    alreadySetup = true;

  }

  @Transactional
  private final User createUserIfNotFound(final String username, String email, Set<Role> roles) {
    User user = registrationRepository.findByUsername(username);
    if (user == null) {
      System.out.println("*******************");
      user = new User();
      user.setUsername(username);
      user.setEmail(email);
      user.setPassword(passwordEncoder.encode("admin@123"));
      user.setRoles(roles);
      user = registrationRepository.save(user);
    }
    return user;
  }

  @Transactional
  private final UserEntityDto createUserDtoIfNotFound(final String username, String email,
      Set<Role> roles) {
    UserEntityDto user = registrationRepositorydto.findByUsername(username);
    if (user == null) {
      System.out.println("*******************");
      user = new UserEntityDto();
      user.setUsername(username);
      user.setEmail(email);
      user.setRoles(roles);
      user = registrationRepositorydto.save(user);
    }
    return user;
  }

  @Transactional
  private final Role createRoleIfNotFound(final ERole name) {
    Role role = roleRepository.findByName(name);
    if (role == null) {
      // role.setName(name);
      role = roleRepository.save(new Role(name));
    }

    return role;
  }
}
