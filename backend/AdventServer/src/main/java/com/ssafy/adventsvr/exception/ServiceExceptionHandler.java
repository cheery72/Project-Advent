package com.ssafy.adventsvr.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(annotations = RestController.class)
public class ServiceExceptionHandler {

    @ExceptionHandler(NoSuchUserException.class)
    protected ResponseEntity handleNoSuchUserException(NoSuchUserException e) {
        final ErrorResponse errorResponse = ErrorResponse.builder().code("Item Not Found").message(e.getMessage()).build();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);

    }

    @ExceptionHandler(NoSuchAdventDayException.class)
    protected ResponseEntity handleNoSuchAdventDayException(NoSuchAdventDayException e) {
        final ErrorResponse errorResponse = ErrorResponse.builder().code("Item Not Found").message(e.getMessage()).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(NoWriteAdventException.class)
    protected ResponseEntity handleNoWriteAdventException(NoWriteAdventException e) {
        final ErrorResponse errorResponse = ErrorResponse.builder().code("Item Not Found").message(e.getMessage()).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(NoDayAdventException.class)
    protected ResponseEntity handleNoDayAdventException(NoDayAdventException e) {
        final ErrorResponse errorResponse = ErrorResponse.builder().code("Item Not Found").message(e.getMessage()).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(NoSuchPasswordException.class)
    protected ResponseEntity handleNoSuchPasswordException(NoSuchPasswordException e) {
        final ErrorResponse errorResponse = ErrorResponse.builder().code("Item Not Found").message(e.getMessage()).build();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }
}
