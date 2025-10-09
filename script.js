import inquirer from "inquirer";

// Initial Data (In-memory storage)
let students = [
  { id: 1, name: "Alice", age: 20, grade: "A", department: "Computer Science" },
  { id: 2, name: "Bob", age: 22, grade: "B", department: "Electronics" },
  { id: 3, name: "Charlie", age: 21, grade: "A", department: "Mechanical" },
];

// Define allowed grades for validation
const ALLOWED_GRADES = ["A+", "A", "B+", "B", "C", "D", "E", "F"];

// =================================================================
// R (Read) - Utility: Display all students
// =================================================================
function displayStudents(data = students) {
  console.log("\n Current Students List:");
  if (data.length === 0) {
    console.log(" No students found!");
    return;
  }
  // console.table is a Node.js utility for clean tabular output
  console.table(data); 
}

// =================================================================
// C (Create) - Add a new student
// =================================================================
async function addStudent() {
  const answers = await inquirer.prompt([
    {
      name: "id",
      type: "number",
      message: "Enter student ID:",
      // ID DUPLICATION VALIDATION
      validate: (input) => {
        const inputId = Number(input);
        
        if (isNaN(inputId) || inputId <= 0) {
          return "Please enter a valid positive number for the ID.";
        }
        
        // Check for existing ID
        const exists = students.some((s) => s.id === inputId);
        if (exists) {
          return "This student ID is already Existing"; 
        }
        return true;
      },
    },
    { name: "name", type: "input", message: "Enter student name:" },
    { name: "age", type: "number", message: "Enter student age:" },
    {
      name: "grade",
      type: "input",
      message: "Enter student grade:",
      // GRADE INPUT VALIDATION
      validate: (input) => {
        const grade = input.toUpperCase().trim();
        if (!ALLOWED_GRADES.includes(grade)) {
          return `Kindly enter your Correct Grade (Allowed: ${ALLOWED_GRADES.join(", ")})`; 
        }
        return true;
      },
      filter: (input) => input.toUpperCase().trim(), // Normalize input
    },
    { name: "department", type: "input", message: "Enter student department:" },
  ]);

  students.push(answers);
  console.log("✅ Student added successfully!");
  displayStudents();
}

// =================================================================
// U (Update) - Update a student's details
// =================================================================
async function updateStudent() {
  if (students.length === 0) return console.log(" No students to update!");
  displayStudents();

  const { id } = await inquirer.prompt([
    { name: "id", type: "number", message: "Enter ID of student to update:" },
  ]);

  const student = students.find((s) => s.id === id);
  if (!student) {
    console.log("❌ Student not found!");
    return;
  }

  const updates = await inquirer.prompt([
    { name: "name", type: "input", message: "New name:", default: student.name },
    { name: "age", type: "number", message: "New age:", default: student.age },
    { 
        name: "grade", 
        type: "input", 
        message: "New grade:", 
        default: student.grade,
        // Grade validation for updates
        validate: (input) => {
            const grade = input.toUpperCase().trim();
            if (!ALLOWED_GRADES.includes(grade)) {
                return `Kindly enter your Correct Grade (Allowed: ${ALLOWED_GRADES.join(", ")})`;
            }
            return true;
        },
        filter: (input) => input.toUpperCase().trim(),
    },
    { name: "department", type: "input", message: "New department:", default: student.department },
  ]);

  // Merge the updates into the existing student object
  Object.assign(student, updates); 
  console.log("📝 Student updated successfully!");
  displayStudents();
}

// =================================================================
// D (Delete) - Delete a student
// =================================================================
async function deleteStudent() {
  if (students.length === 0) return console.log(" No students to delete!");
  displayStudents();

  const { id } = await inquirer.prompt([
    { name: "id", type: "number", message: "Enter ID of student to delete:" },
  ]);

  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    console.log("❌ Student not found!");
    return;
  }

  // Remove the student at the found index
  students.splice(index, 1); 
  console.log("🗑️ Student deleted successfully!");
  displayStudents();
}

// =================================================================
// Utility: Search students by name
// =================================================================
async function searchStudent() {
  const { name } = await inquirer.prompt([
    { name: "name", type: "input", message: "Enter name to search:" },
  ]);

  const result = students.filter((s) =>
    s.name.toLowerCase().includes(name.toLowerCase())
  );

  console.log(`\n 🔍 Search Results for "${name}":`);
  displayStudents(result);
}

// =================================================================
// Utility: Filter students by department, grade, or age
// =================================================================
async function filterStudents() {
  const { criteria, value } = await inquirer.prompt([
    {
      name: "criteria",
      type: "list",
      message: "Select filter criteria:",
      choices: ["grade", "department", "age"],
    },
    { name: "value", type: "input", message: "Enter value to filter by:" },
  ]);

  let filtered = [];

  if (criteria === 'age') {
      const numericValue = Number(value);
      if (isNaN(numericValue)) {
          console.log("\n❌ Please enter a valid number for age filtering.");
          return;
      }
      filtered = students.filter((s) => s.age === numericValue);
  } else {
      filtered = students.filter(
          // Ensure comparison works even if the property value is a number (like 'age')
          (s) => String(s[criteria]).toLowerCase() === value.toLowerCase()
      );
  }

  console.log(`\n Filtered Students (${criteria}: ${value}):`);
  displayStudents(filtered);
}


// =================================================================
// Main Application Loop
// =================================================================
async function mainMenu() {
  while (true) {
    const { choice } = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "Select an action:",
        choices: [
          " View All Students",
          " Add Student",
          " Update Student",
          " Delete Student",
          " Search Student (by Name)",
          " Filter Students",
          " Exit",
        ],
      },
    ]);

    switch (choice) {
      case " View All Students":
        displayStudents();
        break;
      case " Add Student":
        await addStudent();
        break;
      case " Update Student":
        await updateStudent();
        break;
      case " Delete Student":
        await deleteStudent();
        break;
      case " Search Student (by Name)":
        await searchStudent();
        break;
      case " Filter Students":
        await filterStudents();
        break;
      case "Exit":
        console.log("\n Exiting Student Management System. Goodbye! 👋");
        process.exit(0);
      default:
        console.log("Invalid choice. Please try again.");
    }
  }
}

// Run the main menu
mainMenu();