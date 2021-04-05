package com.main.Restaurant_App.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.main.Restaurant_App.model.ImageModel;

public interface ImageRepository extends JpaRepository<ImageModel, Integer> {

  public Optional<ImageModel> findByRestidAndType(int restid, String type);

  public List<ImageModel> findByRestid(int restid);


}
