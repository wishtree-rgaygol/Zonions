package com.main.Restaurant_App.service;

import java.io.IOException;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.main.Restaurant_App.exception.ResourceNotFoundException;
import com.main.Restaurant_App.model.Restaurant;
import com.main.Restaurant_App.repository.RestaurantRepository;


@Service
public class RestaurantService {	

	@Autowired
	private RestaurantRepository repo;
	
	LocalTime time=LocalTime.now();
	String lastUpdatedTime=time.toString();
	
	public List<Restaurant> getAllRestaurants()
	{
		return repo.findAll();
	}
	
	public ResponseEntity<Restaurant> getRestaurantById(int id) {
		Restaurant tempRestObj = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Restaurant is not found for this id :" + id));
		return ResponseEntity.ok().body(tempRestObj);
	}

	public Restaurant fetchRestaurantByName(String restname)
	{
		return repo.findByRestname(restname);
	}

	public Restaurant addRestaurant(Restaurant restaurant)
	{
		restaurant.setLastModifiedTime(lastUpdatedTime);
		System.out.println(lastUpdatedTime);
		return repo.save(restaurant);
	}
	
	public ResponseEntity<Restaurant> updateRestaurantById(Restaurant restDetails, int id)
	{
		restDetails.setLastModifiedTime(lastUpdatedTime);
		Restaurant restaurant = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Restaurant is not found for this id :" + id));
		restaurant.setId(restDetails.getId());
		restaurant.setRestname(restDetails.getRestname());
		restaurant.setAddress(restDetails.getAddress());
		restaurant.setPhoneNo(restDetails.getPhoneNo());
		restaurant.setOpenTime(restDetails.getOpenTime());
		restaurant.setCloseTime(restDetails.getCloseTime());
		restaurant.setActive(restDetails.isActive());
		final Restaurant updatedRestaurant = repo.save(restaurant);
		return ResponseEntity.ok().body(updatedRestaurant);

	}
	
	
	public Map<String, Boolean> deleteRestaurantById(int id)
	{
		Restaurant restaurant = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Restaurant is not found for this id :" + id));
		repo.delete(restaurant);
		Map<String, Boolean> deleteResponce = new HashMap<>();
		deleteResponce.put("Restaurant deleted", Boolean.TRUE);
		return deleteResponce;
	}
	
	public String uploadImage(@RequestParam("file") MultipartFile file, int id) throws IOException {
		System.out.println("Original Image Byte Size - " + file.getBytes().length);
		Restaurant restaurant = repo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Restaurant is not found for this id :" + id));
		restaurant.setName(file.getOriginalFilename());
		restaurant.setType(file.getContentType());
		restaurant.setPicByte(file.getBytes());
		System.out.println("Upload rest obj:" + restaurant.getName());

		repo.save(restaurant);
		return "Image Uploaded";
	}

	public ResponseEntity<byte[]> getFile(String name, int restid) {
		final Optional<Restaurant> retrievedImage = repo.findByNameAndId(name, restid);
		if (retrievedImage.isPresent()) {
			Restaurant img = retrievedImage.get();
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION, "connected;filename=\"" + img.getName() + "\"")
					.body(img.getPicByte());
		}
		return ResponseEntity.status(404).body(null);
	}
}
