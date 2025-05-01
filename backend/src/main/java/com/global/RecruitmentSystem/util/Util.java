package com.global.RecruitmentSystem.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Util {
    private static final ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);


    public static String write(Object obj){
        try{
           return mapper.writeValueAsString(obj);
        }catch(Exception e){
            log.warn("Failed To Write Object to JSON: {}", obj.toString());
        }
        return null;
    }
}
