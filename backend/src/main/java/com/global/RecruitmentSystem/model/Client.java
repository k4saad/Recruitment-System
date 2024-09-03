package com.global.RecruitmentSystem.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer clientId;

    private String name;

    private String organizationName;

    private String contactNumber;

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String username;

    private String password;

    @OneToMany(
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL,
            mappedBy = "client"
    )
    private List<ClientRequirement> clientRequirements;

    @OneToMany(
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL,
            mappedBy = "client"
    )
    private List<ClientNotification> clientNotifications;

    public Client(){
        this.clientRequirements = new ArrayList<>();
        this.clientNotifications = new ArrayList<>();
    }

    public void addRequirement(ClientRequirement newClientRequirement){
        if (clientRequirements == null){
            clientRequirements = new ArrayList<>();
        }
        clientRequirements.add(newClientRequirement);
        newClientRequirement.setClient(this);
    }
}
