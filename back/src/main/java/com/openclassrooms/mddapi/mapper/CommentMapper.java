package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dto.response.CommentResponse;
import com.openclassrooms.mddapi.model.Comment;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CommentMapper {

    public CommentResponse toDto(Comment comment){
        return CommentResponse.builder()
                .id(comment.getId())
                .username(comment.getUser().getUsername())
                .content(comment.getContent())
                .build();
    }

    public List<CommentResponse> toDto(List<Comment> comments){
        return comments.stream().map(this::toDto).collect(Collectors.toList());
    }

}
