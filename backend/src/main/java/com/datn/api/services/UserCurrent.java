package com.datn.api.services;

import com.datn.api.entity.Users;
import com.datn.api.exceptions.NotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class  UserCurrent {
    public static Users get (){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try {
            return (Users) authentication.getPrincipal();
        }catch (Exception ex){
            throw new NotFoundException("Not found user current");
        }
    }
}
