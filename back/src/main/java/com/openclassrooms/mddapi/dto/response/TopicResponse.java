package com.openclassrooms.mddapi.dto.response;

import lombok.*;

@AllArgsConstructor
@Data
@Builder
public class TopicResponse {
    private Long id;
    private String name;
    private String description;
    private Boolean subscribed;
}
