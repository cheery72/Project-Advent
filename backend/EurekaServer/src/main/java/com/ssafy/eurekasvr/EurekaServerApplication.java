package com.ssafy.eurekasvr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class EurekaServerApplication {

	//http://k6c206.p.ssafy.io:8761/ : spring Eureka 접속
	public static void main(String[] args) {
		
		SpringApplication.run(EurekaServerApplication.class, args);
		
	}

}
