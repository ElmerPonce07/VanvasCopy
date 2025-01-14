package com.example.vanas.vanvas.controller;

import com.example.vanas.vanvas.DTO.TeacherLoginResponse;
import com.example.vanas.vanvas.model.Classroom;
import com.example.vanas.vanvas.model.Teacher;
import com.example.vanas.vanvas.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RestController
@RequestMapping
public class TeacherController {
    private final TeacherService teacherService;

    @Autowired
    public TeacherController (TeacherService teacherService){
        this.teacherService = teacherService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerTeacher (@RequestBody Teacher teacher){
        try {
            teacherService.registerTeacher(teacher);
            return new ResponseEntity<>("Teacher registered successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<TeacherLoginResponse> loginTeacher(@RequestParam String email, @RequestParam String password) {
        try {
            Teacher teacher = teacherService.login(email, password);
            TeacherLoginResponse response = new TeacherLoginResponse(
                    teacher.getTeacherId(),
                    teacher.getFirstName(),
                    teacher.getLastName(),
                    teacher.getTeacherEmail()
            );
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(null);
        }
    }

    @GetMapping("/getIdByEmail")
    public ResponseEntity<String> getTeacherIdByEmail(@RequestParam String email) {
        try {
            String teacherId = teacherService.getTeacherIdByEmail(email);
            return new ResponseEntity<>(teacherId, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/classes")
    public ResponseEntity<?> getTeacherClasses(@RequestParam(required = false) String id,
                                               @RequestParam(required = false) String email) {
        try {
            if (id == null && email == null) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Please provide either 'id' or 'email'"));
            }

            String teacherId;
            Teacher teacher;
            if (id != null) {
                teacherId = id;
                teacher = teacherService.getTeacherById(teacherId);
            } else {
                teacherId = teacherService.getTeacherIdByEmail(email);
                teacher = teacherService.getTeacherById(teacherId);
            }

            List<Classroom> classrooms = teacherService.getClassesByTeacherId(teacherId);
            return ResponseEntity.ok(Map.of(
                    "id", teacher.getTeacherId(),
                    "firstName", teacher.getFirstName(),
                    "lastName", teacher.getLastName(),
                    "email", teacher.getTeacherEmail(),
                    "classes", classrooms
            ));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}

