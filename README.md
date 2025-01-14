# API Endpoints

### Classroom endpoints

#### Classroom Creation save

```/api/classrooms/classSave``` This endpoint saves the classroom onto the database 

Expected json input example:
```
{
    "id": "classroom_001",
    "name": "Physics 101",
    "teacher": {
        "id": "teacher_001",
        "name": "Dr. Smith",
        "email": "dr.smith@example.com"
    },
    "assignments": [],
    "students": []
}
```

#### Connection Check
``` /api/classrooms/check ``` This endpoint is to verify the connection to the backend.
if the connection is properly established. This endpoint should return "it works"

#### Assignment Add
```/api/classrooms/{classroomId}/addAssignment``` Adds assignments to a particular classroom 
REQUIRED PARAMETER: Classroom ID
Expected json input example:
```
{
    "id": "assignment_002",
    "name": "History Project",
    "dueDate": "2024-12-01",
    "priority": 2.0,
    "description": "Research and present a historical event",
    "type": "Project",
    "studentgrade": []
}
```

#### Find classroom by name
```/api/classrooms/findclassroom/{name}``` returns the classroom that matches the parameter  
REQUIRED PARAMETER: Name of the class

#### Generate ToDo list 
```/api/assignment/todoList/{studentId}``` Generates the todo list of assignments based on priority 
REQUIRED PARAMETER: Student ID


#### Get student classrooms 
```/getStudentClassrooms/{studentId}```  Returns all the classrooms the student is currently in 
REQUIRED PARAMETER: Student ID 
