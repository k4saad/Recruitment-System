package com.global.RecruitmentSystem.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class AdminResponse {
    private Integer id;

    private String name;
    private String username;
    private String email;
}
