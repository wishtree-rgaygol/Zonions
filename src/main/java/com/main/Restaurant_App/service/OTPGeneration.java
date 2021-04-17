package com.main.Restaurant_App.service;


import java.util.Random;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

@Service
public class OTPGeneration {
  private static final Integer EXPIRE_MINS = 5;
  private LoadingCache<String, Integer> otpCache;

  private static final Logger logger = LoggerFactory.getLogger(OTPGeneration.class);

  public OTPGeneration() {
    otpCache = CacheBuilder.newBuilder().expireAfterWrite(EXPIRE_MINS, TimeUnit.MINUTES)
        .build(new CacheLoader<String, Integer>() {
          @Override
          public Integer load(String key) throws Exception {
            return 0;
          }
        });
  }

  public int generateOTP(String key) {
    logger.info("Inside Generate OTP Last Method for Key--", key);
    Random random = new Random();
    int otp = 100000 + random.nextInt(900000);
    otpCache.put(key, otp);
    logger.info("Inside Generate OTP Last Method and Generated OTP--", otp);
    return otp;
  }

  public int getOtp(String key) {
    try {
      return otpCache.get(key);
    } catch (Exception e) {
      return -1;
    }
  }

  public void clearOTP(String key) {
    otpCache.invalidate(key);
  }
}
