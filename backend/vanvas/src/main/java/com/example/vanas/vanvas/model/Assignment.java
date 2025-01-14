package com.example.vanas.vanvas.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import com.example.vanas.vanvas.model.classroomUtil.StudentGrade;


public class Assignment {
    @Id
    public String id;
    public String name;
    @Field("dueDate")
    private LocalDate dueDate;
    private double priority;
    public String description;
    public String type;
    public List<StudentGrade> studentgrade;
    
    public Assignment(String id,String name,LocalDate dueDate,String description,String type, double priority,List<StudentGrade> StudentGrade){
        this.id = id;
        this.name = name;
        this.dueDate = dueDate;
        this.description = description;
        this.type = type;
        this.priority = priority;
        this.studentgrade =  StudentGrade != null ?  StudentGrade : new ArrayList<>();
    }

    public Assignment() {}

    // Getters
    public String getId() {
        return id;
    }
  

    public String getName() {
        return name;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public String getDescription() {
        return description;
    }

    public String getType() {
        return type;
    }
    public double  getPriority(){
        return priority;
    } 

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setTime(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setType(String type) {
        this.type = type;
    }
    public void setPriority(double priority){
        this.priority = priority;
    }

    public List<StudentGrade> getStudentGrades() {
        return studentgrade;
    }


    public void setStudentGrades(ArrayList<StudentGrade> studentgrade) {
        this.studentgrade = studentgrade;
    }

    @Override
    public String toString() {
        return "Assignment{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", time=" + dueDate+
                ", description='" + description + '\'' +
                ", type='" + type + '\'' +
                ", studentGrades=" + studentgrade +
                '}';
    }





}
