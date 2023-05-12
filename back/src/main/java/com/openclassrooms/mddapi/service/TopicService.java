package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.response.TopicResponse;
import com.openclassrooms.mddapi.mapper.TopicMapper;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private TopicMapper topicMapper;

    public List<TopicResponse> getTopics(){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return this.topicMapper.toDto(this.topicRepository.findAll(), user);
    }

    public Topic findById(Long id){
        return this.topicRepository.findById(id).orElseThrow();
    }

    public List<TopicResponse> getSubscribedTopics(User user){
        return this.topicMapper.toDto(user.getSubscriptions(), user);
    }

}
