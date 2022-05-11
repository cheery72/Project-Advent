package com.ssafy.adventsvr.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(annotations = RestController.class)
public class ServiceExceptionHandler {

    @ExceptionHandler(NotAuthenticationException.class)
    protected ResponseEntity NotAuthenticationException(NotAuthenticationException e) {
        final ErrorResponse errorResponse = ErrorResponse.builder().code("User Not Authentication").message(e.getMessage()).build();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);

    }

    @ExceptionHandler(NotRequestException.class)
    protected ResponseEntity handleNotRequestException(NotRequestException e) {
        final ErrorResponse errorResponse = ErrorResponse.builder().code("Advent Not Found").message(e.getMessage()).build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    @ExceptionHandler(NoSuchAdventException.class)
    protected ResponseEntity handleNoSuchAdventException(NoSuchAdventException e) {
        final ErrorResponse errorResponse = ErrorResponse.builder().code("Advent Bad Request").message(e.getMessage()).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

}
