package com.ssafy.adventsvr.exception;

public class NoSuchPasswordException extends RuntimeException {

    public NoSuchPasswordException(String message) {
        super(message);
    }
}
