package com.openclassrooms.mddapi.dto.request;

import lombok.Getter;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

@Getter
public class UpdateUserRequest {

    @Email(message = "Invalid email")
    private String email;

    @Pattern(regexp = "^[a-zA-Z0-9]{3,}", message = "Invalid username")
    private String username;

}
