package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.request.CommentRequest;
import com.openclassrooms.mddapi.dto.request.CreatePostRequest;
import com.openclassrooms.mddapi.dto.response.CommentResponse;
import com.openclassrooms.mddapi.mapper.CommentMapper;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.CommentRepository;
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

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentMapper commentMapper;

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

    public List<CommentResponse> getComments(Long id){
        return this.commentMapper.toDto(this.commentRepository.findAllByPostId(id));
    }

    public CommentResponse addComment(Long postId, CommentRequest commentRequest){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Post post = this.getPostById(postId);
        Comment comment = Comment.builder()
                .user(user)
                .post(post)
                .content(commentRequest.getContent())
                .build();

        return this.commentMapper.toDto(this.commentRepository.save(comment));
    }

}
