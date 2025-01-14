package com.example.vanas.vanvas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Document(collection = "Teachers")
public class Teacher {
    @Id
    private String id;

    @NotNull(message = "First name is required")
    private String firstName;

    @NotNull(message = "Last name is required")
    private String lastName;

    @Email(message = "Email should be valid")
    private String teacherEmail;

    @NotNull(message = "Password is required")
    @Size(min = 8, message = "Password should be at least 8 characters")
    private String teacherPassword;

    private Boolean isAdmin;

    public Teacher() {
    }

    public Teacher(String id, String firstName, String lastName, String teacherEmail, String teacherPassword, Boolean isAdmin) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.teacherEmail = teacherEmail;
        this.teacherPassword = teacherPassword;
        this.isAdmin = isAdmin;
    }

    public String getTeacherId() {
        return id;
    }

    public void setTeacherId(String teacherId) {
        this.id = teacherId;
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

    public String getTeacherEmail() {
        return teacherEmail;
    }

    public void setTeacherEmail(String teacherEmail) {
        this.teacherEmail = teacherEmail;
    }

    public String getTeacherPassword() {
        return teacherPassword;
    }

    public void setTeacherPassword(String teacherPassword) {
        this.teacherPassword = teacherPassword;
    }

    public Boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    @Override
    public String toString() {
        return "Teacher{" +
                "teacherId='" + id + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", teacherEmail='" + teacherEmail + '\'' +
                ", teacherPassword='" + teacherPassword + '\'' +
                ", isAdmin=" + isAdmin +
                '}';
    }
}
