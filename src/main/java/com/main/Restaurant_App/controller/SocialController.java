package com.main.Restaurant_App.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.api.User;
import org.springframework.social.facebook.api.impl.FacebookTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.main.Restaurant_App.model.ERole;
import com.main.Restaurant_App.model.Role;
import com.main.Restaurant_App.model.TokenClass;
import com.main.Restaurant_App.model.UserEntityDto;
import com.main.Restaurant_App.security.jwt.JwtUtils;
import com.main.Restaurant_App.security.service.AuthenticationService;
import com.main.Restaurant_App.security.service.RoleService;

@RestController
@RequestMapping("/oauth")
@CrossOrigin(origins = "*")
public class SocialController {

  @Value("${google.clientId}")
  String googleClientId;

  @Value("${secretPsw}")
  String secretPsw;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  AuthenticationService authService;

  @Autowired
  RoleService roleService;

  @Autowired
  JwtUtils jwtProvider;

  @PostMapping("/google")
  public ResponseEntity<TokenClass> google(@RequestBody TokenClass tokenDto,
      HttpServletRequest request) throws IOException {
    final NetHttpTransport transport = new NetHttpTransport();
    final JacksonFactory jacksonFactory = JacksonFactory.getDefaultInstance();
    GoogleIdTokenVerifier.Builder verifier =
        new GoogleIdTokenVerifier.Builder(transport, jacksonFactory)
            .setAudience(Collections.singletonList(googleClientId));
    final GoogleIdToken googleIdToken =
        GoogleIdToken.parse(verifier.getJsonFactory(), tokenDto.getValue());
    final GoogleIdToken.Payload payload = googleIdToken.getPayload();
    com.main.Restaurant_App.model.User userEntity = new com.main.Restaurant_App.model.User();
    UserEntityDto userEntityDto = new UserEntityDto();
    if (authService.existsByEmail(payload.getEmail())) {
      userEntity = authService.findByEmail(payload.getEmail());
    } else {
      String name = (String) payload.get("name");
      userEntity = saveUser(payload.getEmail(), name, "google");
      userEntityDto = saveUserDto(payload.getEmail(), name);
    }
    TokenClass tokenRes = login(userEntity);
    @SuppressWarnings("unchecked")
    List<String> sessionUser = (List<String>) request.getSession().getAttribute("Login_Session");
    if (sessionUser == null) {
      sessionUser = new ArrayList<>();

      request.getSession().setAttribute("Login_Session", payload.getEmail());

    }

    sessionUser.add(payload.getEmail());
    request.getSession().setAttribute("Login_Session", sessionUser);

    return new ResponseEntity(tokenRes, HttpStatus.OK);
  }

  @PostMapping("/facebook")
  public ResponseEntity<TokenClass> facebook(@RequestBody TokenClass tokenDto,
      HttpServletRequest request) throws IOException {
    Facebook facebook = new FacebookTemplate(tokenDto.getValue());
    final String[] fields = {"email", "picture", "name"};
    User user = facebook.fetchObject("me", User.class, fields);
    com.main.Restaurant_App.model.User userEntity = new com.main.Restaurant_App.model.User();
    UserEntityDto userEntityDto = new UserEntityDto();
    if (authService.existsByEmail(user.getEmail())) {
      userEntity = authService.findByEmail(user.getEmail());
    } else {
      userEntity = saveUser(user.getEmail(), user.getName(), "facebook");
      userEntityDto = saveUserDto(user.getEmail(), user.getName());
    }
    TokenClass tokenRes = login(userEntity);
    @SuppressWarnings("unchecked")
    List<String> sessionUser = (List<String>) request.getSession().getAttribute("Login_Session");
    if (sessionUser == null) {
      sessionUser = new ArrayList<>();

      request.getSession().setAttribute("Login_Session", user.getEmail());

    }

    sessionUser.add(user.getEmail());
    request.getSession().setAttribute("Login_Session", sessionUser);
    return new ResponseEntity(tokenRes, HttpStatus.OK);
  }

  private TokenClass login(com.main.Restaurant_App.model.User userEntity) {
    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(userEntity.getEmail(), secretPsw));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtProvider.generateJwtToken(authentication);
    TokenClass tokenDto = new TokenClass();
    tokenDto.setValue(jwt);
    return tokenDto;
  }

  private com.main.Restaurant_App.model.User saveUser(String email, String name, String source) {
    com.main.Restaurant_App.model.User userEntity =
        new com.main.Restaurant_App.model.User(email, passwordEncoder.encode(secretPsw));
    userEntity.setUsername(name);
    Role roleUser = roleService.getByERole(ERole.ROLE_USER);
    Set<Role> roles = new HashSet<>();
    roles.add(roleUser);
    userEntity.setRoles(roles);
    userEntity.setSource(source);
    return authService.save(userEntity);
  }

  private UserEntityDto saveUserDto(String email, String name) {
    UserEntityDto userEntityDto = new UserEntityDto(email);
    userEntityDto.setUsername(name);
    Role roleUser = roleService.getByERole(ERole.ROLE_USER);
    Set<Role> roles = new HashSet<>();
    roles.add(roleUser);
    userEntityDto.setRoles(roles);
    return authService.save(userEntityDto);
  }

}
