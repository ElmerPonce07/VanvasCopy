package com.example.vanas.vanvas.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vanas.vanvas.model.Assignment;
import com.example.vanas.vanvas.service.AssignmentService;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RestController
@RequestMapping("/api/assignment")
public class AssignmentController {
    @Autowired
    private AssignmentService assignmentService;

    @GetMapping("/todoList/{studentId}")
    public ResponseEntity<List<Assignment>> getSortedAssignmentsForStudent(@PathVariable String studentId) {
        return ResponseEntity.ok(assignmentService.getSortedAssignmentsForStudent(studentId));
    }
}
