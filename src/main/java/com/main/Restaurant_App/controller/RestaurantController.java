package com.main.Restaurant_App.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.main.Restaurant_App.model.Restaurant;
import com.main.Restaurant_App.service.RestaurantService;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/zonions")
// @EnableSwagger2
public class RestaurantController {

  @Autowired
  private RestaurantService service;
  private static final Logger logger = LoggerFactory.getLogger(RestaurantController.class);


  private static final String RESTAURANT_SERVICE = "restaurantService";

  public ResponseEntity<String> rateLimiterFallback(Exception e) {
    return new ResponseEntity<>("Many requests please try after some time..! ",
        HttpStatus.TOO_MANY_REQUESTS);

  }


  @Autowired
  RestaurantService rservice;

  @PostMapping("/restaurants")
  @PreAuthorize("hasRole('ADMIN')")
  public Restaurant registerResto(@RequestBody Restaurant restoObj) throws Exception {
    logger.info("Inside Restaurant Register method");
    String tempRestname = restoObj.getRestname();
    if (tempRestname != null && !"".equals(tempRestname)) {
      Restaurant tempRestObj = rservice.fetchRestaurantByName(tempRestname);
      if (tempRestObj != null) {
        throw new Exception("Restaurant with " + tempRestname + " is already exist");
      }
    }
    Restaurant tempRestObj = null;
    tempRestObj = rservice.registerResto(restoObj);
    return tempRestObj;
  }

  @PutMapping(value = "/upload/{restid}", consumes = "multipart/form-data")
  public String uplaodImage(@RequestParam MultipartFile file,
      @PathVariable(value = "restid") int restid) throws Exception {
    logger.info("Upload Restaurant id :" + restid + "File name :" + file.getName()
        + "Original file name" + file.getOriginalFilename());
    /*
     * System.out.println("Upload Rest id :" + restid + "File name :" + file.getName() +
     * "Original file name" + file.getOriginalFilename());
     */
    return rservice.uploadImage(file, restid);
  }

  @GetMapping("/get/{restid}/{name}")
  public ResponseEntity<byte[]> getFile(@PathVariable("restid") int restid,
      @PathVariable("name") String name) throws IOException {
    return rservice.getFile(name, restid);
  }

  @GetMapping("/restaurants")
  @RateLimiter(name = RESTAURANT_SERVICE, fallbackMethod = "rateLimiterFallback")
  public ResponseEntity<List<Restaurant>> getAllRestaurants() {
    logger.info("Inside get all Restaurant method");
    List<Restaurant> resList = rservice.getAllRestaurant();
    return ResponseEntity.of(Optional.of(resList));
  }

  @GetMapping("/restaurants/{restid}")
  @RateLimiter(name = RESTAURANT_SERVICE, fallbackMethod = "rateLimiterFallback")
  public ResponseEntity<Restaurant> getRestaurantById(@PathVariable(value = "restid") int restid)
      throws Exception {
    logger.info("Inside get Restaurant by ID method");
    return rservice.getRestaurantById(restid);
  }

  @PutMapping("/restaurants/{restid}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Restaurant> updateRestaurant(@PathVariable(value = "restid") int restid,
      @RequestBody Restaurant restDetails) throws Exception {
    logger.info("Inside Update Restaurant method");
    return rservice.updateRestaurant(restid, restDetails);
  }

  @DeleteMapping("/restaurants/{restid}")
  @PreAuthorize("hasRole('ADMIN')")
  public Map<String, Boolean> deleteRestaurant(@PathVariable(value = "restid") int restid)
      throws Exception {
    logger.info("Inside Delete Restaurant method for ID -" + restid);
    /* System.out.println("Delete Rest ID" + restid); */
    return rservice.deleteRestaurant(restid);
  }



}


