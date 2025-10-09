# Student Management System
This is a basic Student Management System implemented using JavaScript with arrays and objects. It provides full CRUD (Create, Read, Update, Delete) functionality and incorporates search and filter features utilizing standard array methods.

## Features
- Create (Add Student): Add new student records to the system.
- Read (View Students): Display a list of all current students.
- Update (Edit Student): Modify the details of an existing student.
- Delete (Remove Student): Remove a student record from the system.
- Search: Find students based on criteria like name or student ID.
- Filter: Filter the student list based on attributes like grade or course enrollment.

## Technology Used
- JavaScript: Core language for implementation.
- Arrays: Used to store the collection of student objects.
- Objects: Used to represent individual student records (e.g., { id: 1, name: 'John Doe', ... }).
- Array Methods: Extensive use of methods like push(), findIndex(), splice(), map(), filter(), and - find() for CRUD and search/filter operations.

## Core Operations & Array Methods Used
 ### Operation == Description == Key Array Method(s)
- Create: Adds a new student object to the main array.	push()
- Read: Iterates through the array to display all students.	map() or simple iteration
- Update: Finds the student by ID, then replaces/updates the object's properties.	findIndex(), then direct index access or splice()
- Delete: Finds the student by ID, and removes it from the array.	findIndex(), then splice()
- Search: Finds specific student(s) matching a search query (e.g., name).	filter() or find()
- Filter: Creates a new array with students that meet specific criteria (e.g., grade 'A').	filter()

💡 How to Run (Conceptual)
- This system is generally intended to be run in a JavaScript environment (e.g., Node.js console application or a web browser's console/front-end).
- Clone the repository (if applicable).
- Open the relevant JavaScript file (script.js or similar).
- Execute the functions (e.g., addStudent(), viewStudents(), searchStudents('John')) to interact with the system.
