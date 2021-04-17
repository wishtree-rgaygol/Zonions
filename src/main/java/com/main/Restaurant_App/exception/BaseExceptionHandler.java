package com.main.Restaurant_App.exception;

import org.springframework.web.bind.annotation.RestControllerAdvice;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class BaseExceptionHandler {


  // @ResponseStatus(HttpStatus.BAD_REQUEST)
  // @ExceptionHandler(MethodArgumentNotValidException.class)
  // public ApiResponse handleValidationExceptions(MethodArgumentNotValidException ex) {
  //
  // Map<String, String> errors = new HashMap<>();
  //
  // ex.getBindingResult().getFieldErrors().forEach(error -> {
  // if (errors.containsKey(error.getField())) {
  // errors.put(error.getField(), String.format("%s, %s", errors.get(error.getField()),
  // error.getDefaultMessage()));
  // } else {
  // errors.put(error.getField(), error.getDefaultMessage());
  // }
  // }
  // );
  // return new ApiResponse(errors, "VALIDATION_FAILED");
  // }
}
