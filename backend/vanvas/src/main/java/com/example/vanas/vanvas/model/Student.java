package com.example.vanas.vanvas.model;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Students")
public class Student {
    
    @Id
    private String studentId;
    
    @NotNull(message = "First name is required")
    private String firstName;
    
    @NotNull(message = "Last name is required")
    private String lastName;
    
    @Email(message = "Email should be valid")
    private String studentEmail;
    
    @NotNull(message = "Password is required")
    @Size(min = 8, message = "Password should be at least 8 characters")
    private String studentPassword;
    private Boolean isAdmin;

    public Student() {}

    public Student(String studentId, String firstName, String lastName, String studentEmail, String studentPassword, Boolean isAdmin) {
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.studentEmail = studentEmail;
        this.studentPassword = studentPassword;
        this.isAdmin = isAdmin;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public String getStudentPassword() {
        return studentPassword;
    }

    public void setStudentPassword(String studentPassword) {
        this.studentPassword = studentPassword;
    }

    public Boolean getAdmin() {
        return isAdmin;
    }

    public void setAdmin(Boolean admin) {
        isAdmin = admin;
    }

    @Override
    public String toString() {
        return "Student{" +
                "studentId='" + studentId + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", studentEmail='" + studentEmail + '\'' +
                ", studentPassword='" + studentPassword + '\'' +
                ", isAdmin=" + isAdmin +
                '}';
    }
}
