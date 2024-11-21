package com.datn.api.exceptions;

public class DuplicateRecordException extends RuntimeException {
	public DuplicateRecordException(String message) {
		super(message);
	}
}
