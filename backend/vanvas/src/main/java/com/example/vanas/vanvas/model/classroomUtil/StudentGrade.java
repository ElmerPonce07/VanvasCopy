package com.example.vanas.vanvas.model.classroomUtil;

public class StudentGrade {
    private String studentId;
    private Double grade;

    public StudentGrade(String studentId, Double grade) {
        this.studentId = studentId;
        this.grade = grade;
    }

    public StudentGrade() {}

    // Getters
    public String getStudentId() {
        return studentId;
    }

    public Double getGrade() {
        return grade;
    }

    // Setters
    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public void setGrade(Double grade) {
        this.grade = grade;
    }

    @Override
    public String toString() {
        return "StudentGrade{" +
                "studentId='" + studentId + '\'' +
                ", grade=" + grade +
                '}';
    }

}
