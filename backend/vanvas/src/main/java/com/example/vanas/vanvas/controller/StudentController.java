package com.example.vanas.vanvas.controller;

import com.example.vanas.vanvas.DTO.StudentLoginResponse;
import com.example.vanas.vanvas.model.Student;
import com.example.vanas.vanvas.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerStudent (@RequestBody Student student){
        try {
            studentService.registerStudent(student);
            return new ResponseEntity<>("Student registered successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/login")
    public ResponseEntity<StudentLoginResponse> loginStudent(@RequestParam String email, @RequestParam String password) {
        try {
            Student student = studentService.login(email, password);
            StudentLoginResponse response = new StudentLoginResponse(
                    student.getStudentId(),
                    student.getFirstName(),
                    student.getLastName(),
                    student.getStudentEmail()
            );
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(null);
        }
    }



    @GetMapping("/getIdByEmail")
    public ResponseEntity<String> getStudentIdByEmail(@RequestParam String email) {
        try {
            String studentId = studentService.getStudentIdByEmail(email);
            return new ResponseEntity<>(studentId, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }



    @GetMapping("/test")
    public String testEndpoint() {
        return "StudentController is working!";
    }




}

