package com.main.Restaurant_App.service;

import java.io.IOException;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import com.main.Restaurant_App.exception.NoDataFoundException;
import com.main.Restaurant_App.exception.RestaurantNotFound;
import com.main.Restaurant_App.model.Restaurant;
import com.main.Restaurant_App.repository.RestaurantRepository;


@Service
public class RestaurantService {

  private static Logger log = LoggerFactory.getLogger(RestaurantService.class);

  @Autowired
  private RestaurantRepository repository;

  LocalTime time = LocalTime.now();
  String lastUpdatedTime = time.toString();

  public List<Restaurant> getAllRestaurants() {
    List<Restaurant> list = (List<Restaurant>) repository.findAll();

    if (list.isEmpty()) {

      throw new NoDataFoundException();
    }
    return list;
  }

  public Optional<Restaurant> getRestaurantById(int id) {
    Optional<Restaurant> restaurant = repository.findById(id);
    if (restaurant == null) {
      throw new RestaurantNotFound(id);
    }
    return restaurant;
  }

  public Restaurant addRestaurant(Restaurant restaurant) {
    Restaurant result = repository.save(restaurant);
    log.info(lastUpdatedTime);
    return result;
  }


  public void updateRestaurantById(Restaurant restaurant, int id) {
    if (id == 0) {
      throw new RestaurantNotFound(id);
    }
    restaurant.setLastModifiedTime(lastUpdatedTime);
    restaurant.setId(id);
    repository.save(restaurant);
  }


  public void deleteRestaurantById(int id) {
    if (id == 0) {
      throw new RestaurantNotFound(id);
    }
    repository.deleteById(id);
  }

  public String uploadImage(@RequestParam("file") MultipartFile file, int id) throws IOException {
    System.out.println("Original Image Byte Size - " + file.getBytes().length);
    Restaurant restaurant = repository.findById(id).orElseThrow(() -> new RestaurantNotFound(id));
    restaurant.setName(file.getOriginalFilename());
    restaurant.setType(file.getContentType());
    restaurant.setPicByte(file.getBytes());
    System.out.println("Upload rest obj:" + restaurant.getName());

    repository.save(restaurant);
    return "Image Uploaded";
  }

  public ResponseEntity<byte[]> getFile(String name, int id) {
    final Optional<Restaurant> retrievedImage = repository.findByNameAndId(name, id);
    if (retrievedImage.isPresent()) {
      Restaurant img = retrievedImage.get();
      return ResponseEntity.ok()
          .header(HttpHeaders.CONTENT_DISPOSITION, "connected;filename=\"" + img.getName() + "\"")
          .body(img.getPicByte());
    }
    return ResponseEntity.status(404).body(null);
  }

}
