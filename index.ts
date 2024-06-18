#! usr/bin/env node

import inquirer from "inquirer";

class Student {
  static counter = 10000;
  id: number;
  name: string;
  courses: string[];
  balance: number;

  constructor(name: string) {
    this.id = Student.counter++;
    this.name = name;
    this.courses = [];
    this.balance = 500;
  }

  enroll_coure(course: string) {
    this.courses.push(course);
  }

  view_balance() {
    console.log(`Balance for ${this.name} is ${this.balance}`);
  }
  pay_fee(amount: number) {
    this.balance = -amount;
    console.log(`$ ${amount} Fee has been paid for ${this.name}`);
  }
  show_status() {
    console.log(`ID: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log(`Courses: ${this.courses}`);
    console.log(`Balance: ${this.balance}`);
    ``;
  }
}

class student_mgmt {
  students: Student[];

  constructor() {
    this.students = [];
  }

  add_student(name: string) {
    let student = new Student(name);
    this.students.push(student);
    console.log(
      `Student:${name} added successfully. Student Id is ${student.id}`
    );
  }

  enroll_student(student_id: number, course: string) {
    let student = this.find_student(student_id);
    if (student) {
      student.enroll_coure(course);
      console.log(`${student.name} enrolled in Course ${course} successfully`);
    }
  }

  view_student_balance(student_id: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.view_balance();
    } else {
      console.log(`Student not found. Kindly enter valid Student ID`);
    }
  }

  pay_student_fee(student_id: number, amount: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.pay_fee(amount);
    } else {
      console.log(`Student not found. Kindly enter valid Student ID`);
    }
  }

  show_student_status(student_id: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.show_status();
    } else {
      console.log(`Student not found. Kindly enter valid Student ID`);
    }
  }

  find_student(student_id: number) {
    return this.students.find((std) => std.id === student_id);
  }
}
async function main() {
  console.log("Welcome to your own Student Management System");
  console.log("*".repeat(70));

  let Student_mgmt = new student_mgmt();

  while (true) {
    let choice = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "Kindly select an option from the list given below",
        choices: [
          "Add Student",
          "Enroll Student",
          "View Student Balance",
          "Pay Student Fees",
          "Show Student Status",
          "Exit",
        ],
      },
    ]);

    switch (choice.choice) {
      case "Add Student":
        let name_input = await inquirer.prompt([
          {
            name: "student_Name",
            Type: "Input",
            Message: "Kindly enter Student Name",
          },
        ]);
        Student_mgmt.add_student(name_input.student_name);
        break;

      case "Enroll Student":
        let course_input = await inquirer.prompt([
          {
            name: "Student_id",
            type: "number",
            message: "Enter a Student ID",
          },
          {
            name: "Course",
            type: "input",
            message: "Enter a Course name to add",
          },
        ]);
        Student_mgmt.enroll_student(
          course_input.Student_id,
          course_input.Course
        );
        break;

      case "View Student Balance":
        let balance_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter Student ID",
          },
        ]);
        Student_mgmt.view_student_balance(balance_input.student_id);
        break;

      case "Pay Student Fees":
        let fee_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter Student ID",
          },
          {
            name: "pay_fees",
            type: "number",
            message: "Enter amount to pay",
          },
        ]);
        Student_mgmt.pay_student_fee(fee_input.student_id, fee_input.pay_fees);
        break;
      case "Show Student Status":
        let status_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter Student ID",
          },
        ]);
        Student_mgmt.show_student_status(status_input.student_id);
        break;

      case "Exit":
        console.log("Thank you for using this portal");
        process.exit();
    }
  }
}
main();
