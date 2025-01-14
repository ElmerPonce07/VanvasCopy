package com.example.vanas.vanvas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.vanas.vanvas.model.Assignment;
import com.example.vanas.vanvas.model.Classroom;
import com.example.vanas.vanvas.model.Student;
import com.example.vanas.vanvas.service.ClassroomService;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RestController
@RequestMapping("/api/classrooms")
public class ClassroomController {

    private final ClassroomService classroomService;

    @Autowired
    public ClassroomController(ClassroomService classroomService) {
        this.classroomService = classroomService;
    }

    @PostMapping("/classSave")
    public ResponseEntity<Classroom> saveClassroom(@RequestBody Classroom classroom) {
        Classroom savedClassroom = classroomService.saveClassroom(classroom);
        return new ResponseEntity<>(savedClassroom, HttpStatus.CREATED);
    }

    @GetMapping("/check")
    public String check() {
        return "It works lol";
    }

    @PostMapping("/{classroomId}/addAssignment")
    public ResponseEntity<Assignment> addAssignment(@PathVariable String classroomId, @RequestBody Assignment assignment) {
        classroomService.addAssignment(classroomId, assignment);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/findclassroom/{name}")
    public ResponseEntity<List<Classroom>> findClassroomByName(@PathVariable String name) {
        List<Classroom> classrooms = classroomService.findByName(name);
        if (classrooms.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(classrooms, HttpStatus.OK);
    }

    @GetMapping("/getStudentClassrooms/{studentId}")
    public ResponseEntity<List<Classroom>> getClassroomsByStudentId(@PathVariable String studentId) {
        List<Classroom> classrooms = classroomService.findByStudentClassrooms(studentId);
        if (classrooms.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(classrooms, HttpStatus.OK);
    }

    @GetMapping("/getTeacherClassrooms/{teacherId}")
    public ResponseEntity<List<Classroom>> getClassroomsByTeacherId(@PathVariable String teacherId) {
        List<Classroom> classrooms = classroomService.findByTeacherClassrooms(teacherId);
        if (classrooms.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(classrooms, HttpStatus.OK);
    }


    @PostMapping("/{classroomId}/addStudent")
    public ResponseEntity<String> addStudentToClassroom(@PathVariable String classroomId, @RequestBody Student student) {
        try {
            classroomService.addStudent(classroomId, student);
            return new ResponseEntity<>("Student added successfully.", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @DeleteMapping("/{classroomId}/removeStudent/{studentId}")
    public ResponseEntity<String> removeStudentFromClassroom(@PathVariable String classroomId, @PathVariable String studentId) {
        try {
            classroomService.removeStudent(classroomId, studentId);
            return new ResponseEntity<>("Student removed successfully.", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}

