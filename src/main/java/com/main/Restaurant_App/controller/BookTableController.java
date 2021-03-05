package com.main.Restaurant_App.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.main.Restaurant_App.model.BookTable;
import com.main.Restaurant_App.service.BookTableService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/zonions")
public class BookTableController {

  @Autowired
  BookTableService bookTableService;

  @PostMapping("/bookTable")
  @PreAuthorize("hasRole('USER')")
  public BookTable bookTable(@RequestBody BookTable bookTable) {
    System.out.println("In book table controller");
    return bookTableService.bookTable(bookTable);
  }

  // @GetMapping("/getBookings")
  // @PreAuthorize("hasRole('USER')")
  // public List<BookTable> getAllBookings(@RequestBody BookTable bookTable) {
  // List<BookTable> bookingList = bookTableService.getAllBookings();
  // return bookingList;
  // }
}
