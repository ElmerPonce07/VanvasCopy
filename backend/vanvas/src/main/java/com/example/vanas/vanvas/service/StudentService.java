package com.example.vanas.vanvas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.vanas.vanvas.model.Student;
import com.example.vanas.vanvas.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public StudentService(StudentRepository studentRepository, PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Student login(String email, String password) {
        return studentRepository.findByStudentEmail(email)
            .filter(student -> passwordEncoder.matches(password, student.getStudentPassword()))
            .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
    }

    public Student registerStudent(Student student) {
        if (studentRepository.findByStudentEmail(student.getStudentEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }

        String hashedPassword = passwordEncoder.encode(student.getStudentPassword());
        student.setStudentPassword(hashedPassword);

        return studentRepository.save(student);
    }

    public String getStudentIdByEmail(String email) {
        return studentRepository.findByStudentEmail(email)
                .map(Student::getStudentId)
                .orElseThrow(() -> new IllegalArgumentException("Student with email not found"));
    }

}
