package com.main.Restaurant_App.exception;

public class RestaurantNotFound extends RuntimeException{

	public RestaurantNotFound(Integer id) {
		super(String.format("Restaurant with Id %d not found", id));
	}
}
