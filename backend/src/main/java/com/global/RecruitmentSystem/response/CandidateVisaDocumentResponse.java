package com.global.RecruitmentSystem.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.tomcat.util.codec.binary.Base64;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CandidateVisaDocumentResponse {
    private Integer visaDocumentId;

    private String visaDocument;

    public CandidateVisaDocumentResponse(
            Integer visaDocumentId,
            byte[] visaDocumentBytes
    ){
        this.visaDocumentId = visaDocumentId;
        this.visaDocument = visaDocumentBytes != null ? Base64.encodeBase64String(visaDocumentBytes) : null;
    }
}
