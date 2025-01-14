package com.example.vanas.vanvas.repository;

import com.example.vanas.vanvas.model.Teacher;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TeacherRepository extends MongoRepository<Teacher, String> {

    Optional<Teacher> findByTeacherEmail(String email);

    Optional<Teacher> findByTeacherId(String id);
}
