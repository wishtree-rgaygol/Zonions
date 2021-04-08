package com.main.Restaurant_App.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import com.main.Restaurant_App.model.ImageModel;
import com.main.Restaurant_App.model.Restaurant;
import com.main.Restaurant_App.repository.ImageRepository;
import com.main.Restaurant_App.repository.RestaurantRepository;


@Service
public class RestaurantService {

  private static Logger log = LoggerFactory.getLogger(RestaurantService.class);
  @Autowired
  RestaurantRepository repo;

  @Autowired
  ImageRepository irepo;

  int vCount;

  // @Autowired
  // ImageRepository irepo;
  public RestaurantService() {}

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
    if (tempRestObj != null) {
      vCount = tempRestObj.getVisitCount();
      vCount++;
      tempRestObj.setVisitCount(vCount);
      repo.save(tempRestObj);
    }
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

  public String uploadImage(@RequestParam("file") MultipartFile file, @PathVariable int id,
      @PathVariable String type) {

    Optional<Restaurant> restId = repo.findById(id);
    try {
      if (restId.isPresent()) {
        ImageModel menu = new ImageModel();

        menu.setRestid(id);
        menu.setType(type);
        menu.setName(file.getOriginalFilename());
        menu.setMimetype(file.getContentType());
        menu.setPic(file.getBytes());

        irepo.save(menu);

      }
      return "File uploaded successfully! -> filename = " + file.getOriginalFilename();
    } catch (Exception e) {
      return "FAIL! Maybe You had uploaded the file before or the file's size > 500KB";
    }

  }

  public List<ImageModel> getMenuById(int restid) {
    List<ImageModel> list = irepo.findByRestid(restid);
    return list;
  }

}
