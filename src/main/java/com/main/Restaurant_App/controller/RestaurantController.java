package com.main.Restaurant_App.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

import com.main.Restaurant_App.exception.ResourceNotFoundException;
import com.main.Restaurant_App.model.Restaurant;
import com.main.Restaurant_App.service.RestaurantService;

import springfox.documentation.swagger2.annotations.EnableSwagger2;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
@EnableSwagger2
public class RestaurantController {

	@Autowired
	private RestaurantService rservice;
	private static final Logger logger = LoggerFactory.getLogger(RestController.class);

	@GetMapping("/restaurants/getAllRest")
//	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<Restaurant> getRestaurants()
	{
		return rservice.getAllRestaurants();

	}
	
	@GetMapping("/restaurants/getRestByID/{id}")
//	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<Restaurant> getRestaurantById(@PathVariable("id") int id)
	{
		return rservice.getRestaurantById(id);
	}
	
	@PostMapping("/restaurants/addRest")
//	@PreAuthorize("hasRole('ADMIN')")
	public Restaurant addRestaurant(@RequestBody Restaurant restoObj) {
		String tempRestname = restoObj.getRestname();
		if (tempRestname != null && !"".equals(tempRestname)) {
			Restaurant tempRestObj = rservice.fetchRestaurantByName(tempRestname);
			if (tempRestObj != null) {
				throw new ResourceNotFoundException("Restaurant with " + tempRestname + " is already exist");
		}
	}
	Restaurant tempRestObj = null;
	tempRestObj = rservice.addRestaurant(restoObj);
	return tempRestObj;
}
	
	
	@PutMapping("/restaurants/updateRest/{id}")
//	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Restaurant> updateRestaurant(@RequestBody Restaurant restaurant, @PathVariable int id)
	{
		return rservice.updateRestaurantById(restaurant, id);
	}
	
	@DeleteMapping("/restaurants/deleteRest/{id}")
//	@PreAuthorize("hasRole('ADMIN')")
	public Map<String, Boolean> deleteRestaurant(@PathVariable int id)
	{
		System.out.println("Delete Rest ID" + id);
		return rservice.deleteRestaurantById(id);
	}

	@PutMapping(value = "/restaurants/upload/{id}", consumes = "multipart/form-data")
	public String uplaodImage(@RequestParam MultipartFile file, @PathVariable(value = "id") int id) throws Exception {
		System.out.println("Upload Rest id :" + id + "File name :" + file.getName() + "Original file name"
				+ file.getOriginalFilename());
		return rservice.uploadImage(file, id);
	}

	@GetMapping("/restaurants/get/{id}/{name}")
	public ResponseEntity<byte[]> getFile(@PathVariable("id") int id, @PathVariable("name") String name) {
		return rservice.getFile(name, id);
	}
}
