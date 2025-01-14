package com.example.vanas.vanvas.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.vanas.vanvas.model.Assignment;
import com.example.vanas.vanvas.model.Classroom;
import com.example.vanas.vanvas.repository.ClassroomRepo;

@Service
public class AssignmentService {
    @Autowired
    private ClassroomRepo classroomRepo;

    public List<Assignment> getSortedAssignmentsForStudent(String studentId) {
    // Fetch classrooms containing the student
    List<Classroom> classrooms = classroomRepo.findAssignmentsByStudentId(studentId);

    // Extract assignments from all classrooms
    List<Assignment> assignments = classrooms.stream()
            .flatMap(classroom -> classroom.getAssignments().stream()) // Extract all assignments
            .collect(Collectors.toList());

    if (assignments.isEmpty()) {
        System.err.println("No assignments found for student ID: " + studentId);
        return Collections.emptyList();
    }

    // Sort assignments by calculated score
    return assignments.stream()
            .sorted(Comparator.comparingDouble(this::calculateScore).reversed())
            .collect(Collectors.toList());
}

    private double calculateScore(Assignment assignment) {
        if (assignment == null || assignment.getDueDate() == null) {
            System.err.println("Assignment is null or has a null dueDate");
            return 0.0; // Default score for invalid assignments
        }

        LocalDateTime dueDate = parseDueDate(assignment.getDueDate());
        if (dueDate == null) {
            System.err.println("Invalid dueDate for assignment ID: " + 
                Optional.ofNullable(assignment.getId()).orElse("UNKNOWN"));
            return 0.0;
        }

        // Calculate days left, ensuring no division by zero
        long daysLeft = ChronoUnit.DAYS.between(LocalDate.now(), dueDate.toLocalDate());
        daysLeft = Math.max(daysLeft, 1); // Avoid division by zero

        System.out.println("Assignment with ID " + assignment.getId() + 
            " has " + daysLeft + " days left until the due date.");

        // Safely handle priorityScore
        double priorityScore = Optional.ofNullable(assignment.getPriority()).orElse(0.0);

        return (1.0 / daysLeft) + priorityScore;
    }

    private LocalDateTime parseDueDate(Object dueDate) {
        if (dueDate instanceof String) {
            try {
                return LocalDateTime.parse((String) dueDate); // Ensure parsing handles ISO 8601
            } catch (DateTimeParseException e) {
                System.err.println("Invalid date format for dueDate: " + dueDate);
                return null;
            }
        } else {
            System.err.println("Unexpected date type for dueDate: " + dueDate.getClass().getName());
            return null;
        }
    }
}
