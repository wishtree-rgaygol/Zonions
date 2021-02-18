package com.main.Restaurant_App.controller;

import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.Min;
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


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/zonions")
// @EnableSwagger2
public class RestaurantController {

  @Autowired
  private RestaurantService service;
  private static final Logger logger = LoggerFactory.getLogger(RestController.class);
  /*
   * private static final String RESTAURANT_SERVICE = "restaurantService";
   * 
   * public ResponseEntity<String> rateLimiterFallback(NoDataFoundException e) { return new
   * ResponseEntity<>("Many requests please try after some time..! ", HttpStatus.TOO_MANY_REQUESTS);
   * 
   * }
   */


  // @RateLimiter(name = RESTAURANT_SERVICE, fallbackMethod = "rateLimiterFallback")
  @GetMapping("/restaurants")
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  public ResponseEntity<List<Restaurant>> getRestaurants() {
    List<Restaurant> list = service.getAllRestaurants();
    logger.info("Inside gettting all restaurants...!");
    return ResponseEntity.of(Optional.of(list));
  }

  // @RateLimiter(name = RESTAURANT_SERVICE, fallbackMethod = "rateLimiterFallback")
  @GetMapping("/restaurants/{id}")
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  public ResponseEntity<Optional<Restaurant>> getRestaurantById(
      @Min(20) @PathVariable("id") int id) {
    Optional<Restaurant> restaurant;

    restaurant = service.getRestaurantById(id);
    logger.info("Inside gettting restaurant by its Id...!");
    return ResponseEntity.of(Optional.of(restaurant));
  }

  @PostMapping("/restaurants")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Restaurant> addRestaurant(@Valid @RequestBody Restaurant restaurant) {
    logger.info("Inside gettting add restaurant...!");
    Restaurant res = null;
    try {
      res = service.addRestaurant(restaurant);
      return ResponseEntity.status(HttpStatus.CREATED).body(res);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
  }


  @PutMapping("/restaurants/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Void> updateRestaurant(@RequestBody Restaurant restaurant,
      @PathVariable int id) {
    logger.info("Inside update restaurant...!");
    service.updateRestaurantById(restaurant, id);
    return ResponseEntity.status(HttpStatus.OK).build();

  }

  @DeleteMapping("/restaurants/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Void> deleteRestaurant(@PathVariable int id) {
    logger.info("Inside delete restaurant...!");
    service.deleteRestaurantById(id);
    return ResponseEntity.status(HttpStatus.ACCEPTED).build();

  }


  @PostMapping(value = "/upload/{id}", consumes = "multipart/form-data")
  public String uplaodImage(@RequestParam MultipartFile file, @PathVariable(value = "id") int id)
      throws Exception {
    logger.info("Upload Rest id :" + id + "File name :" + file.getName() + "Original file name"
        + file.getOriginalFilename());
    return service.uploadImage(file, id);
  }

  @GetMapping("/get/{id}/{name}")
  public ResponseEntity<byte[]> getImage(@PathVariable("id") int id,
      @PathVariable("name") String name) {
    return service.getFile(name, id);
  }
}
