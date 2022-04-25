package com.ssafy.adventsvr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class AdventServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdventServerApplication.class, args);
	}

}
