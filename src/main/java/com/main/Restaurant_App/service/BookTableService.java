package com.main.Restaurant_App.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.main.Restaurant_App.model.BookTable;
import com.main.Restaurant_App.repository.BookTableRepository;

@Service
public class BookTableService {

  @Autowired
  BookTableRepository bookRepo;


  public BookTable bookTable(BookTable bookTable) {
    System.out.println("In booktable service");
    return bookRepo.save(bookTable);
  }
  //
  // public List<BookTable> getAllBookings() {
  // return bookRepo.;
  // }
}
