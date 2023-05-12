package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.request.UpdateUserRequest;
import com.openclassrooms.mddapi.dto.response.UserDetailsResponse;
import com.openclassrooms.mddapi.mapper.UserMapper;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;


    @PutMapping
    ResponseEntity<UserDetailsResponse> updateUser(@RequestBody @Valid UpdateUserRequest req){

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        final Optional<User> userCheckEmail = this.userService.findByEmail(req.getEmail());
        if(userCheckEmail.isPresent() && !user.getEmail().equals(req.getEmail())){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        final Optional<User> userCheckUsername = this.userService.findByUsername(req.getUsername());
        if(userCheckUsername.isPresent() && !user.getUsername().equals(req.getUsername())){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        user = this.userService.updateUser(user, req);
        return ResponseEntity.ok(this.userMapper.toDto(user));
    }

}
