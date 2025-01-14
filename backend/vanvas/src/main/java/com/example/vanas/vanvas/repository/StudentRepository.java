package com.example.vanas.vanvas.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.vanas.vanvas.model.Student;

public interface StudentRepository extends MongoRepository<Student, String> {

    Optional<Student> findByStudentEmail(String email);

    Optional<Student> findByStudentId(String studentId);

    
}
