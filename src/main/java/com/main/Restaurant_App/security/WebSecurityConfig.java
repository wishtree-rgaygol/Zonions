package com.main.Restaurant_App.security;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.context.annotation.Profile;
// import org.springframework.security.authentication.AuthenticationManager;
// import
// org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import
// org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import
// org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import com.google.common.collect.ImmutableList;
// import com.main.Restaurant_App.security.jwt.AuthEntryPointJwt;
// import com.main.Restaurant_App.security.jwt.AuthTokenFilter;
// import com.main.Restaurant_App.security.service.UserDetailsServiceImpl;
//
//
// @Configuration
// @EnableWebSecurity
// @EnableGlobalMethodSecurity(prePostEnabled = true)
// public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
// @Autowired
// UserDetailsServiceImpl userDetailsService;
//
// @Autowired
// private AuthEntryPointJwt unauthorizedHandler;
//
// @Bean
// public AuthTokenFilter authenticationJwtTokenFilter() {
// return new AuthTokenFilter();
// }
//
// @Override
// public void configure(AuthenticationManagerBuilder authenticationManagerBuilder)
// throws Exception {
// authenticationManagerBuilder.userDetailsService(userDetailsService)
// .passwordEncoder(passwordEncoder());
// }
//
// @Bean
// @Override
// public AuthenticationManager authenticationManagerBean() throws Exception {
// return super.authenticationManagerBean();
// }
//
// @Bean
// public PasswordEncoder passwordEncoder() {
// return new BCryptPasswordEncoder();
// }
//
// private static final String[] extra_api = {
//
// "/v2/api-docs", "/v3/api-docs", "/swagger-resources/**", "/configuration/ui",
// "/configuration/security", "/swagger-ui.html", "/swagger-ui/**", "/webjars/**"};
//
// @Override
// protected void configure(HttpSecurity http) throws Exception {
// http.cors().and().csrf().disable().exceptionHandling()
// .authenticationEntryPoint(unauthorizedHandler).and().sessionManagement()
// .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
// .antMatchers("/api/auth/**").permitAll().antMatchers("/zonions/restaurants/upload/**")
// .hasRole("ADMIN").antMatchers("/zonions/restaurants/get/**").hasRole("ADMIN")
// .antMatchers(extra_api).permitAll().anyRequest().authenticated();
//
// http.addFilterBefore(authenticationJwtTokenFilter(),
// UsernamePasswordAuthenticationFilter.class);
// }
//
// @Bean
// @Profile("prod")
// public CorsConfigurationSource corsConfigurationSource() {
// final CorsConfiguration configuration = new CorsConfiguration();
// configuration.setAllowedOrigins(ImmutableList.of("*"));
// configuration.setAllowedMethods(ImmutableList.of("GET", "POST", "PUT", "DELETE"));
// configuration.setAllowCredentials(true);
// configuration
// .setAllowedHeaders(ImmutableList.of("Authorization", "Cache-Control", "Content-Type"));
// final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
// source.registerCorsConfiguration("/**", configuration);
// return source;
// }
// }


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import com.google.common.collect.ImmutableList;
import com.main.Restaurant_App.security.jwt.AuthEntryPointJwt;
import com.main.Restaurant_App.security.jwt.AuthTokenFilter;
import com.main.Restaurant_App.security.service.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
    // securedEnabled = true,
    // jsr250Enabled = true,
    prePostEnabled = true)
// @Profile("!prod")
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
  @Autowired
  UserDetailsServiceImpl userDetailsService;

  @Autowired
  private AuthEntryPointJwt unauthorizedHandler;

  @Bean
  public AuthTokenFilter authenticationJwtTokenFilter() {
    return new AuthTokenFilter();
  }

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

    auth.eraseCredentials(false);
    auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
  }

  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.cors().and().csrf().disable().exceptionHandling()
        .authenticationEntryPoint(unauthorizedHandler).and().sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
        .antMatchers("/auth/**", "/otp/**").permitAll().antMatchers("/user/**").permitAll()
        .antMatchers("/v2/api-docs", "/configuration/**", "/swagger*/**", "/webjars/**",
            "/swagger-ui.html/**")
        .permitAll().antMatchers("/zonions/restaurants/**").permitAll().antMatchers("/zonions/**")
        .permitAll().anyRequest().authenticated();

    http.addFilterBefore(authenticationJwtTokenFilter(),
        UsernamePasswordAuthenticationFilter.class);
  }



  @Bean
  @Profile("prod")
  public CorsConfigurationSource corsConfigurationSource() {
    final CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(ImmutableList.of("*"));
    configuration.setAllowedMethods(ImmutableList.of("GET", "POST", "PUT", "DELETE"));
    configuration.setAllowCredentials(true);
    configuration
        .setAllowedHeaders(ImmutableList.of("Authorization", "Cache-Control", "Content-Type"));
    final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

}

