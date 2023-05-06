package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.request.CreatePostRequest;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private TopicRepository topicRepository;

    public List<Post> getPosts(){
        return this.postRepository.findAllByOrderByDateDesc();
    }

    public Post getPostById(Long id){
        return this.postRepository.findById(id).orElseThrow();
    }

    public Post createPost(CreatePostRequest req) throws NoSuchElementException {
        final User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        final Topic topic = this.topicRepository.findById(req.getTopicId()).orElseThrow();

        return this.postRepository.save(
                Post.builder()
                    .author(user)
                    .topic(topic)
                    .title(req.getTitle())
                    .content(req.getContent())
                    .build()
        );
    }

    public List<Post> getPostFeed(User user){
        return user.getSubscriptions().stream().flatMap(topic -> {
            return this.postRepository.findAllByTopicId(topic.getId()).stream();
        }).collect(Collectors.toList());
    }

}
