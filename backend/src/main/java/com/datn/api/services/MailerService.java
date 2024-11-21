package com.datn.api.services;

import org.springframework.stereotype.Service;

import com.datn.api.entity.MailInfo;

import jakarta.mail.MessagingException;

@Service
public interface MailerService {
	void send(MailInfo mail) throws MessagingException;

	void send(String to, String subject, String body) throws MessagingException;

	void queue(MailInfo mail);

	void queue(String to, String subject, String body);
}
