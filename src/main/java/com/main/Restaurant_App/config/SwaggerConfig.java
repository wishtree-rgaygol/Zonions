package com.main.Restaurant_App.config;

import java.util.Collections;
import javax.annotation.Resource;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import com.main.Restaurant_App.interceptor.LoginInterceptor;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
@EnableAutoConfiguration
public class SwaggerConfig extends WebMvcConfigurationSupport {

  @Resource
  private LoginInterceptor loginInterceptor;


  @Bean
  public Docket api() {
    return new Docket(DocumentationType.SWAGGER_2).select()
        .apis(RequestHandlerSelectors.basePackage("com.main.Restaurant_App"))
        .paths(PathSelectors.any()).build().apiInfo(apiInfo());
  }

  private ApiInfo apiInfo() {
    return new ApiInfo("Zonions API", "Deals with management of restaurants", "1.0",
        "Open Source API",
        new Contact("Zonions", "http://localhost:8080/zonions/restaurants", "zonions@food.com"),
        "Copyrights belongs to zonions", "https://localhost:8080/zonions/restaurants",
        Collections.emptyList());
  }


  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("swagger-ui.html")
        .addResourceLocations("classpath:/META-INF/resources/");
    registry.addResourceHandler("/webjars/**")
        .addResourceLocations("classpath:/META-INF/resources/webjars/");
  }

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(loginInterceptor)
        // addPathPatterns is used to add interception rules. All paths are added to the
        // interception, and then excluded one by one.
        .addPathPatterns("/**").excludePathPatterns("/swagger-ui.html")
        .excludePathPatterns("/swagger-resources/**").excludePathPatterns("/error")
        .excludePathPatterns("/webjars/**");
  }
}
