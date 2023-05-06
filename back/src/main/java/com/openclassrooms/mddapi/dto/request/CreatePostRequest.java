package com.openclassrooms.mddapi.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CreatePostRequest {
    @NotNull(message = "Post id required")
    private Long topicId;

    @NotBlank(message = "Name required")
    @Size(min = 4, max = 50, message = "Post title is not valid")
    private String title;

    @NotBlank(message = "Content required")
    @Size(min = 100, message = "Post content is no valid")
    private String content;
}
