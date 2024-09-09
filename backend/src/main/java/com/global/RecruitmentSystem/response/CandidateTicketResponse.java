package com.global.RecruitmentSystem.response;

import com.global.RecruitmentSystem.enums.TicketStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.tomcat.util.codec.binary.Base64;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CandidateTicketResponse {
    private Integer ticketId;
    private String ticket;

    private TicketStatus status;

    public CandidateTicketResponse(
            Integer ticketId,
            byte[] ticketBytes,
            TicketStatus status
    ){
        this.ticketId = ticketId;
        this.ticket = ticketBytes != null ? Base64.encodeBase64String(ticketBytes) : null;
        this.status = status;
    }
}
