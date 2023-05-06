package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.request.UpdateUserRequest;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    public Optional<User> findById(Long id){
        return this.userRepository.findById(id);
    }

    public Optional<User> findByUsername(String username){
        return this.userRepository.findByUsername(username);
    }

    public Optional<User> findByEmail(String email){
        return this.userRepository.findByEmail(email);
    }

    public User createUser(User user){
        return this.userRepository.save(user);
    }

    public User updateUser(User user, UpdateUserRequest req){
        if(req.getUsername() != null){
            user.setUsername(req.getUsername());
        }
        if(req.getEmail() != null){
            user.setEmail(req.getEmail());
        }

        return this.userRepository.save(user);
    }

    public List<Post> getPostFeed(User user){
        return user.getSubscriptions().stream().flatMap(topic -> {
            return this.postRepository.findAllByTopicId(topic.getId()).stream();
        }).collect(Collectors.toList());
    }

    public void subscribeTopic(User user, Topic topic){
        if(user.getSubscriptions().contains(topic)){
            return;
        }

        user.getSubscriptions().add(topic);
        this.userRepository.save(user);
    }

    public void unsubscribeTopic(User user, Topic topic){
        if(!user.getSubscriptions().contains(topic)){
            return;
        }

        user.getSubscriptions().remove(topic);
        this.userRepository.save(user);
    }

}
