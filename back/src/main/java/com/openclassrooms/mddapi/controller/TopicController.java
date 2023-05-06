package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.response.TopicResponse;
import com.openclassrooms.mddapi.mapper.TopicMapper;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.service.TopicService;
import com.openclassrooms.mddapi.service.UserService;
import org.hibernate.mapping.Any;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/topics")
public class TopicController {

    @Autowired
    private TopicService topicService;

    @Autowired
    private UserService userService;

    @Autowired
    private TopicMapper topicMapper;

    @GetMapping
    public ResponseEntity<List<TopicResponse>> getTopic(){
        return ResponseEntity.ok(this.topicService.getTopics());
    }

    @PostMapping("/{id}/subscribe")
    public ResponseEntity<?> subscribe(@PathVariable Long id){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Topic topic = this.topicService.findById(id);
        this.userService.subscribeTopic(user, topic);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}/unsubscribe")
    public ResponseEntity<?> unsubscribe(@PathVariable Long id){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Topic topic = this.topicService.findById(id);
        this.userService.unsubscribeTopic(user, topic);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/subscribed")
    public ResponseEntity<List<TopicResponse>> getSubscribedTopics() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(this.topicService.getSubscribedTopics(user));
    }




}
