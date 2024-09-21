package com.global.RecruitmentSystem.service;

import com.global.RecruitmentSystem.enums.CandidateStatus;
import com.global.RecruitmentSystem.enums.RefundStatus;
import com.global.RecruitmentSystem.model.Candidate;
import com.global.RecruitmentSystem.model.CandidateApplication;
import com.global.RecruitmentSystem.model.Payment;
import com.global.RecruitmentSystem.repository.PaymentRepository;
import lombok.AllArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.lowagie.text.*;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfContentByte;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import javax.sql.rowset.serial.SerialBlob;
import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@AllArgsConstructor
public class paymentService {
    private final PaymentRepository paymentRepository;
    private final CandidateApplicationService candidateApplicationService;
    private final CandidateService candidateService;

    public Boolean addPayment(Integer applicantId){
        CandidateApplication candidateApplication = candidateApplicationService.getCandidateApplicationById(applicantId);

        Payment payment = com.global.RecruitmentSystem.model.Payment.builder()
                .paymentTimestamp(LocalDateTime.now())
                .amount(BigDecimal.valueOf(5000))
                .build();
        candidateApplication.addPayment(payment);
        Candidate candidate = candidateService.findByUsername(candidateApplication.getCandidate().getUsername());
        candidate.setStatus(CandidateStatus.HIRED);
        Payment paymentSaved = paymentRepository.save(payment);
        generateAndSaveReceipt(paymentSaved);
        return true;
    }

    private void generateAndSaveReceipt(Payment payment) {
        ClassPathResource logoResource = new ClassPathResource("global_logo.png");

        Document document = new Document();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try {
            PdfWriter writer = PdfWriter.getInstance(document, byteArrayOutputStream);
            document.open();

            PdfPTable headerTable = new PdfPTable(2);
            headerTable.setWidthPercentage(100);

            // Title cell
            PdfPCell titleCell = new PdfPCell(new Paragraph("RECEIPT", FontFactory.getFont(FontFactory.TIMES_BOLD, 35, Color.gray)));
            titleCell.setBorder(Rectangle.NO_BORDER);
            titleCell.setHorizontalAlignment(Element.ALIGN_LEFT);
            titleCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            titleCell.setPaddingBottom(10f); // Adjust padding if needed
            headerTable.addCell(titleCell);

            // Logo cell
            PdfPCell logoCell = new PdfPCell();
            com.lowagie.text.Image logo = com.lowagie.text.Image.getInstance(logoResource.getURL());
            logo.scaleToFit(100, 100); // Adjust the logo size if needed
            logo.setAlignment(Element.ALIGN_RIGHT);
            logoCell.addElement(logo);
            logoCell.setBorder(Rectangle.NO_BORDER);
            logoCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            logoCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            headerTable.addCell(logoCell);

            // Add header table to document
            document.add(headerTable);

            document.add(new Paragraph(" ")); // Add an empty line


            document.add(new Paragraph(" ")); // Add an empty line

            // Add Company Information
            PdfPTable companyInfoTable = new PdfPTable(3);
            companyInfoTable.setWidthPercentage(100);
            companyInfoTable.setHorizontalAlignment(Element.ALIGN_CENTER);

            float[] columnWidths = {2f, 0.5f, 1f};
            companyInfoTable.setWidths(columnWidths);

            Font infoFont9Blue = FontFactory.getFont(FontFactory.TIMES, 11, new Color(31, 73, 125));
            Font infoFont9 = FontFactory.getFont(FontFactory.TIMES, 11);
            Font infoFont9BlueBold = FontFactory.getFont(FontFactory.TIMES_BOLD, 11, new Color(31, 73, 125));

            Font infoFont7Blue = FontFactory.getFont(FontFactory.TIMES_BOLD, 9, new Color(31, 73, 125));
            Font infoFont11Blue = FontFactory.getFont(FontFactory.TIMES_BOLD, 13, new Color(31, 73, 125));
            Font infoFont11 = FontFactory.getFont(FontFactory.TIMES , 13);
            Font infoFont11Bold = FontFactory.getFont(FontFactory.TIMES_BOLD, 13);

            addTableCell(companyInfoTable, "Global Manpower Planning Private Limited", infoFont9Blue, Rectangle.BOX);
            addTableCell(companyInfoTable, "       ", infoFont9, Rectangle.BOX);
            addTableCell(companyInfoTable, "PAYMENT DATE : "
                            + payment.getPaymentTimestamp().format(DateTimeFormatter.ofPattern("dd MMMM yyyy HH:mm:ss"))
                    , infoFont9Blue, Rectangle.BOX);

            addTableCell(companyInfoTable, "SHOP No. 3. Chavan Chawl, Jogeshwari (West)\nMumbai, Maharashtra - 400102", infoFont9Blue, Rectangle.BOX);
            addTableCell(companyInfoTable, "       ", infoFont9, Rectangle.BOX);
            addTableCell(companyInfoTable, "RECEIPT NO. : " + payment.getPaymentId().toString(), infoFont9Blue, Rectangle.BOX);

            addTableCell(companyInfoTable, "+91982039XXXX\nglobal@108b@gmail.com", infoFont9, Rectangle.BOX);
            addTableCell(companyInfoTable, "       ", infoFont9, Rectangle.BOX);
            addTableCell(companyInfoTable, "       ", infoFont9, Rectangle.BOX);

            addTableCell(companyInfoTable, "BILL TO", infoFont9BlueBold, Rectangle.BOX);
            addTableCell(companyInfoTable, "       ", infoFont9, Rectangle.BOX);
            addTableCell(companyInfoTable, "BILL FOR", infoFont9BlueBold, Rectangle.BOX);

            addTableCell(companyInfoTable, payment.getCandidateApplication()
                    .getClientRequirement().getClient()
                    .getName(), infoFont9, Rectangle.BOX);
            addTableCell(companyInfoTable, "       ", infoFont9, Rectangle.BOX);
            addTableCell(companyInfoTable, payment.getCandidateApplication()
                    .getCandidate().getName(), infoFont9, Rectangle.BOX);

            addTableCell(companyInfoTable, payment.getCandidateApplication()
                    .getClientRequirement().getClient()
                    .getOrganizationName(), infoFont9, Rectangle.BOX);
            addTableCell(companyInfoTable, "       ", infoFont9, Rectangle.BOX);
            addTableCell(companyInfoTable, payment.getCandidateApplication()
                    .getClientRequirement().getTitle(), infoFont9, Rectangle.BOX);

            addTableCell(companyInfoTable, payment.getCandidateApplication()
                    .getClientRequirement().getClient()
                    .getContactNumber(), infoFont9, Rectangle.BOX);
            addTableCell(companyInfoTable, "       ", infoFont9, Rectangle.BOX);
            addTableCell(companyInfoTable, "APPLICATION ID : " + payment.getCandidateApplication()
                    .getApplicationId().toString(), infoFont9, Rectangle.BOX);


            addTableCell(companyInfoTable, payment.getCandidateApplication()
                    .getClientRequirement().getClient()
                    .getEmail(), infoFont9, Rectangle.BOX);
            addTableCell(companyInfoTable, "       ", infoFont9, Rectangle.BOX);
            addTableCell(companyInfoTable, "       ", infoFont9, Rectangle.BOX);

            document.add(companyInfoTable);

            document.add(new Paragraph(" ")); // Add an empty line

            // Add Payment Details Table
            PdfPTable paymentDetailsTable = new PdfPTable(2);
            paymentDetailsTable.setWidthPercentage(40);
            paymentDetailsTable.setHorizontalAlignment(Element.ALIGN_RIGHT);

            float[] columnWidthsForPaymentDetailsTable = {0.5f, 0.5f};
            paymentDetailsTable.setWidths(columnWidthsForPaymentDetailsTable);

            addTableCell(paymentDetailsTable, "SUBTOTAL", infoFont7Blue, Rectangle.NO_BORDER);
            addTableCell(paymentDetailsTable,  "Rs " + payment.getAmount().toString() , infoFont11, Rectangle.NO_BORDER);

            addTableCell(paymentDetailsTable, "GST", infoFont7Blue, Rectangle.NO_BORDER);
            addTableCell(paymentDetailsTable, "18%\n", infoFont11, Rectangle.NO_BORDER);

            addTableCell(paymentDetailsTable, "TOTAL GST", infoFont7Blue, Rectangle.NO_BORDER);
            addTableCell(paymentDetailsTable, "Rs " + payment.getAmount().multiply(new BigDecimal("0.18")).toString(), infoFont11, Rectangle.NO_BORDER);

            addTableCell(paymentDetailsTable, "PAID", infoFont11Blue, Rectangle.NO_BORDER);
            addTableCell(paymentDetailsTable, "Rs " + payment.getAmount().add(payment.getAmount().multiply(new BigDecimal("0.18"))).toString(), infoFont11Bold, Rectangle.NO_BORDER);

            document.add(paymentDetailsTable);

            document.add(new Paragraph(" ")); // Add an empty line

            PdfContentByte canvas = writer.getDirectContent();
            canvas.setColorStroke(new Color(192,0,0));
            canvas.setLineWidth(10f); // Set the line width to 5 points
            canvas.moveTo(document.left(), document.top() + 20); // Adjust the Y-coordinate as needed
            canvas.lineTo(document.right(), document.top() + 20);
            canvas.stroke();

            canvas.setColorStroke(new Color(192,0,0));
            canvas.setLineWidth(10f); // Set the line width to 5 points
            canvas.moveTo(document.left(), document.bottom() - 20); // Adjust the Y-coordinate as needed
            canvas.lineTo(document.right(), document.bottom() - 20);
            canvas.stroke();

            document.close();

            // Convert PDF to Base64
            byte[] pdfBytes = byteArrayOutputStream.toByteArray();

            Blob pdfBlob = new SerialBlob(pdfBytes);
            payment.setReceipt(pdfBlob);

            // Save payment to database
            paymentRepository.save(payment);

            System.out.println("PDF created and saved to database successfully.");

        } catch (DocumentException | IOException | SQLException e) {
            e.printStackTrace();
        }
    }

    private void addTableCell(PdfPTable table, String text, Font font, int border) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setBorder(border);
        cell.setPaddingTop(5f); // Add space above text
        cell.setPaddingBottom(5f); // Add space below text
        table.addCell(cell);
    }


    public Payment getPaymentById(int id) {
        return paymentRepository.findById(id).orElse(new Payment());
    }

}
