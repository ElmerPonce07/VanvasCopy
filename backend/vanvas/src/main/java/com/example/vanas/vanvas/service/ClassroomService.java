package com.example.vanas.vanvas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.vanas.vanvas.model.Assignment;
import com.example.vanas.vanvas.model.Classroom;
import com.example.vanas.vanvas.model.Student;
import com.example.vanas.vanvas.model.classroomUtil.StudentGrade;
import com.example.vanas.vanvas.repository.ClassroomRepo;

@Service
public class ClassroomService {

    @Autowired
    private ClassroomRepo classroomRepo;

    public Classroom saveClassroom(Classroom classroom) {
        return classroomRepo.save(classroom);
    }

    public List<Classroom> findByName(String name) {
        return classroomRepo.findByName(name);
    }

    public List<Classroom> findByStudentClassrooms(String studentId) {
        return classroomRepo.getStudentClassroomList(studentId);
    }

    public List<Classroom> findByTeacherClassrooms(String teacherId) {
        return classroomRepo.getTeacherClassroomList(teacherId);
    }

    public Assignment addAssignment(String classroomId, Assignment assignment) {
        Classroom classroom = classroomRepo.findById(classroomId)
                .orElseThrow(() -> new IllegalArgumentException("Classroom with id " + classroomId + " not found."));

        classroom.getAssignments().add(assignment);
        classroomRepo.save(classroom);
        return assignment;
    }

    public Student addStudent(String classroomId, Student student) {
        Classroom classroom = classroomRepo.findById(classroomId)
                .orElseThrow(() -> new IllegalArgumentException("Classroom with id " + classroomId + " not found."));

        classroom.getStudents().add(student);
        classroomRepo.save(classroom);
        return student;
    }

    public double calulateStudentClassGrade(String studentId, String classroomId) {
        Classroom classroom = classroomRepo.findAssignmentsByClassroomId(classroomId);

        double totalGrade = 0;
        int assignmentCount = 0;

        for (Assignment assignments : classroom.getAssignments()) {
            for (StudentGrade studentGrade : assignments.getStudentGrades()) {
                if (studentGrade.getStudentId().equals(studentId)) {
                    totalGrade += studentGrade.getGrade();
                    assignmentCount++;
                }
            }
        }

        return assignmentCount > 0 ? totalGrade : null;
    }

    // New Method: Remove student from a classroom
    public void removeStudent(String classroomId, String studentId) {
        Classroom classroom = classroomRepo.findById(classroomId)
                .orElseThrow(() -> new IllegalArgumentException("Classroom with id " + classroomId + " not found."));

        boolean removed = classroom.getStudents().removeIf(student -> student.getStudentId().equals(studentId));
        if (!removed) {
            throw new IllegalArgumentException("Student with id " + studentId + " not found in the classroom.");
        }

        classroomRepo.save(classroom);
    }

    // New Method: Get Assignments for a Classroom
    public List<Assignment> getAssignments(String classroomId) {
        Classroom classroom = classroomRepo.findById(classroomId)
                .orElseThrow(() -> new IllegalArgumentException("Classroom with id " + classroomId + " not found."));
        return classroom.getAssignments();
    }
}
