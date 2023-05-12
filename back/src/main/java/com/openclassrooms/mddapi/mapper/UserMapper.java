package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dto.response.UserDetailsResponse;
import com.openclassrooms.mddapi.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDetailsResponse toDto(User user){
        return UserDetailsResponse.builder()
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .build();

    }

}
