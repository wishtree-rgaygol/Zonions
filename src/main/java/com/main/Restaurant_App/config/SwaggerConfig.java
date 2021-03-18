package com.main.Restaurant_App.config;

import java.time.LocalDate;
import java.time.LocalDateTime;
import javax.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import com.main.Restaurant_App.interceptor.LoginInterceptor;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

// import java.util.Collections;
// import javax.annotation.Resource;
// import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
// import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
// import com.main.Restaurant_App.interceptor.LoginInterceptor;
// import springfox.documentation.builders.PathSelectors;
// import springfox.documentation.builders.RequestHandlerSelectors;
// import springfox.documentation.service.ApiInfo;
// import springfox.documentation.service.Contact;
// import springfox.documentation.spi.DocumentationType;
// import springfox.documentation.spring.web.plugins.Docket;
// import springfox.documentation.swagger2.annotations.EnableSwagger2;
//
// @Configuration
// @EnableSwagger2
// @EnableAutoConfiguration
// public class SwaggerConfig extends WebMvcConfigurationSupport {
//
// @Resource
// private LoginInterceptor loginInterceptor;
//
//
// @Bean
// public Docket api() {
// return new Docket(DocumentationType.SWAGGER_2).select()
// .apis(RequestHandlerSelectors.basePackage("com.main.Restaurant_App"))
// .paths(PathSelectors.any()).build().apiInfo(apiInfo());
// }
//
// private ApiInfo apiInfo() {
// return new ApiInfo("Zonions API", "Deals with management of restaurants", "1.0",
// "Open Source API",
// new Contact("Zonions", "http://localhost:8080/zonions/restaurants", "zonions@food.com"),
// "Copyrights belongs to zonions", "https://localhost:8080/zonions/restaurants",
// Collections.emptyList());
// }
//
//
// @Override
// public void addResourceHandlers(ResourceHandlerRegistry registry) {
// registry.addResourceHandler("swagger-ui.html")
// .addResourceLocations("classpath:/META-INF/resources/");
// registry.addResourceHandler("/webjars/**")
// .addResourceLocations("classpath:/META-INF/resources/webjars/");
// }
//
// @Override
// public void addInterceptors(InterceptorRegistry registry) {
// registry.addInterceptor(loginInterceptor)
// // addPathPatterns is used to add interception rules. All paths are added to the
// // interception, and then excluded one by one.
// .addPathPatterns("/**").excludePathPatterns("/swagger-ui.html")
// .excludePathPatterns("/swagger-resources/**").excludePathPatterns("/error")
// .excludePathPatterns("/webjars/**");
// }
// }


@Configuration
@EnableSwagger2
@ConfigurationProperties("apps.api")
@ConditionalOnProperty(name = "apps.api.swagger.enable", havingValue = "true",
    matchIfMissing = false)
public class SwaggerConfig extends WebMvcConfigurationSupport {
  // @Resource
  // private TypeResolver typeResolver;
  private String version;
  private String title;
  private String description;
  @Value("${apps.api.base-package}")
  private String basePackage;
  private String contactName;
  private String contactEmail;


  @Resource
  private LoginInterceptor loginInterceptor;


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

  // @Primary
  // @Bean
  // public SwaggerResourcesProvider swaggerResourcesProvider(InMemorySwaggerResourcesProvider
  // defaultResourcesProvider) {
  // return () -> {
  // SwaggerResource wsResource = new SwaggerResource();
  // wsResource.setName("new spec");
  // wsResource.setSwaggerVersion("2.0");
  // wsResource.setLocation("/swagger.yaml");
  //
  // List<SwaggerResource> resources = new ArrayList<>(defaultResourcesProvider.get());
  // resources.add(wsResource);
  // return resources;
  // };
  // }

  @Bean
  public Docket api() {
    return new Docket(DocumentationType.SWAGGER_2).select()
        .apis(RequestHandlerSelectors.basePackage(basePackage)).paths(PathSelectors.any()).build()
        .directModelSubstitute(LocalDate.class, java.sql.Date.class)
        .directModelSubstitute(LocalDateTime.class, java.util.Date.class).apiInfo(apiInfo());
  }

  private ApiInfo apiInfo() {
    return new ApiInfoBuilder().title(title).description(description).version(version)
        .contact(new Contact(contactName, null, contactEmail)).build();
  }

  public String getVersion() {
    return version;
  }

  public void setVersion(String version) {
    this.version = version;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getContactName() {
    return contactName;
  }

  public void setContactName(String contactName) {
    this.contactName = contactName;
  }

  public String getContactEmail() {
    return contactEmail;
  }

  public void setContactEmail(String contactEmail) {
    this.contactEmail = contactEmail;
  }

  public LoginInterceptor getLoginInterceptor() {
    return loginInterceptor;
  }

  public void setLoginInterceptor(LoginInterceptor loginInterceptor) {
    this.loginInterceptor = loginInterceptor;
  }

}
