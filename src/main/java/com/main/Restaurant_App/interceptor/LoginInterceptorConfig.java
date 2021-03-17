package com.main.Restaurant_App.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Component
public class LoginInterceptorConfig extends WebMvcConfigurationSupport {

  @Autowired
  LoginInterceptor requestInterceptor;

  @Override
  protected void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(requestInterceptor);
  }


}
