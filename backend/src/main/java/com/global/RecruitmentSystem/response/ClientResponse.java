package com.global.RecruitmentSystem.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class ClientResponse {
    private Integer clientId;
    private String name;
    private String organizationName;
    private String contactNumber;
    private String email;
    private String username;
}
