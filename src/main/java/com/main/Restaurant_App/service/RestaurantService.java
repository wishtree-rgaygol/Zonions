package com.main.Restaurant_App.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import com.main.Restaurant_App.model.Restaurant;
import com.main.Restaurant_App.repository.RestaurantRepository;


@Service
public class RestaurantService {

  private static Logger log = LoggerFactory.getLogger(RestaurantService.class);
  @Autowired
  RestaurantRepository repo;

  // @Autowired
  // ImageRepository irepo;
  public RestaurantService() {
    // TODO Auto-generated constructor stub
  }

  public RestaurantService(RestaurantRepository repo) {
    super();
    this.repo = repo;
  }

  public Restaurant registerResto(Restaurant resto) {
    return repo.save(resto);
  }

  public Restaurant fetchRestaurantByName(String restname) {
    return repo.findByRestname(restname);
  }

  public List<Restaurant> getAllRestaurant() {
    return repo.findAll();
  }

  public ResponseEntity<Restaurant> getRestaurantById(int restid) throws Exception {
    Restaurant tempRestObj = repo.findById(restid)
        .orElseThrow(() -> new Exception("Restaurant is not found for this id :" + restid));
    return ResponseEntity.ok().body(tempRestObj);
  }

  public ResponseEntity<Restaurant> updateRestaurant(int restid, Restaurant restDetails)
      throws Exception {
    Restaurant restaurant = repo.findById(restid)
        .orElseThrow(() -> new Exception("Restaurant not found for this id ::" + restid));
    restaurant.setRestid(restDetails.getRestid());
    restaurant.setRestname(restDetails.getRestname());
    restaurant.setRestaddress(restDetails.getRestaddress());
    restaurant.setRestphone(restDetails.getRestphone());
    restaurant.setOpenTime(restDetails.getOpenTime());
    restaurant.setCloseTime(restDetails.getCloseTime());
    restaurant.setLastModified(restDetails.getLastModified());
    restaurant.setActive(restDetails.isActive());
    final Restaurant updatedRestaurant = repo.save(restaurant);
    return ResponseEntity.ok().body(updatedRestaurant);
  }

  public Map<String, Boolean> deleteRestaurant(int restid) throws Exception {
    Restaurant restaurant = repo.findById(restid)
        .orElseThrow(() -> new Exception("Restaurant not found for this id ::" + restid));
    repo.delete(restaurant);
    Map<String, Boolean> deleteResponce = new HashMap<>();
    deleteResponce.put("Restaurant deleted", Boolean.TRUE);
    return deleteResponce;
  }

  public String uploadImage(@RequestParam("file") MultipartFile file, int restid) throws Exception {
    System.out.println("Original Image Byte Size - " + file.getBytes().length);
    Restaurant restaurant = repo.findById(restid)
        .orElseThrow(() -> new Exception("Restaurant not found for this id ::" + restid));
    restaurant.setName(file.getOriginalFilename());
    restaurant.setType(file.getContentType());
    restaurant.setPicByte(file.getBytes());
    System.out.println("Upload rest obj:" + restaurant.getName());

    repo.save(restaurant);
    return "Image Uploaded";
  }

  public ResponseEntity<byte[]> getFile(String name, int restid) throws IOException {
    final Optional<Restaurant> retrievedImage = repo.findByNameAndRestid(name, restid);
    if (retrievedImage.isPresent()) {
      Restaurant img = retrievedImage.get();
      return ResponseEntity.ok()
          .header(HttpHeaders.CONTENT_DISPOSITION, "connected;filename=\"" + img.getName() + "\"")
          .body(img.getPicByte());
    }
    return ResponseEntity.status(404).body(null);
  }

}
