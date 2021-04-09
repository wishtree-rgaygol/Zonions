package com.main.Restaurant_App.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import com.main.Restaurant_App.model.ImageModel;
import com.main.Restaurant_App.model.Restaurant;
import com.main.Restaurant_App.repository.ImageRepository;
import com.main.Restaurant_App.repository.RestaurantRepository;
import com.main.Restaurant_App.service.RestaurantService;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/zonions")
public class RestaurantController {
  @Autowired
  PasswordEncoder pcode;

  @Autowired
  private RestaurantService service;
  private static final Logger logger = LoggerFactory.getLogger(RestaurantController.class);


  private static final String RESTAURANT_SERVICE = "restaurantService";

  public ResponseEntity<String> rateLimiterFallback(Exception e) {
    return new ResponseEntity<>("Many requests please try after some time..! ",
        HttpStatus.TOO_MANY_REQUESTS);

  }

  boolean match;
  @Autowired
  RestaurantRepository restaurantRepo;


  @Autowired
  RestaurantService rservice;

  @Autowired
  ImageRepository irepo;

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
    return rservice.deleteRestaurant(restid);
  }

  // To upload menu
  @PutMapping(value = "/upload/{restid}/{menuType}")
  @PreAuthorize("hasRole('ADMIN')")
  public String imageUpload(@RequestParam MultipartFile file, @PathVariable int restid,
      @PathVariable String menuType) {
    return rservice.uploadImage(file, restid, menuType);
  }

  // To get Image By name and restaurant Id
  @GetMapping("/file/{restid}/{type}")
  public ResponseEntity<byte[]> getFileByName(@PathVariable int restid, @PathVariable String type) {
    System.out.println("menuType=" + type + "Id=" + restid);
    Optional<ImageModel> fileOptional = irepo.findByRestidAndType(restid, type);

    System.out.println(fileOptional);
    if (fileOptional.isPresent()) {
      ImageModel file = fileOptional.get();
      return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
          "attachment; filename=\"" + file.getName() + "\"").body(file.getPic());
    }

    return ResponseEntity.status(404).body(null);
  }

  @GetMapping(value = "/file/{restid}")
  public List<ImageModel> getMenuById(@PathVariable int restid) {
    List<ImageModel> list = rservice.getMenuById(restid);
    return list;
  }

  @GetMapping(value = "/file")
  public List<ImageModel> getAllMenus() {
    return rservice.getAllMenus();
  }
}


