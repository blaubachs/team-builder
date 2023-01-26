const fs = require("fs");
const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const genHtml = require("./util/generateHtml");

let managersArr = [];
let engineerArr = [];
let internArr = [];

const init = async () => {
  let typeOfEmployeeFlag = "";
  const initPrompt = await inquirer.prompt([
    {
      type: "list",
      message: "What position is this employee in?",
      choices: ["Manager", "Engineer", "Intern"],
      name: "employeeType",
    },
  ]);
  typeOfEmployeeFlag = initPrompt.employeeType;
  console.log(`Employee type chosen is ${typeOfEmployeeFlag}.`);
  const minimumInfoPrompt = await inquirer.prompt([
    {
      type: "input",
      message: "What is this employee's name?",
      name: "employeeName",
    },
    {
      type: "number",
      message: "What is this employee's ID?",
      name: "employeeId",
    },
    {
      type: "input",
      message: "What is this employee's email?",
      name: "employeeEmail",
    },
  ]);
  switch (typeOfEmployeeFlag) {
    case "Manager":
      // run prompt for manager related questions and build manager obj
      const managerInformationPrompt = await inquirer.prompt([
        {
          type: "number",
          message: "What is the office number for this manager?",
          name: "officeNumber",
        },
      ]);
      const buildManager = await new Manager(
        minimumInfoPrompt.employeeName,
        minimumInfoPrompt.employeeId,
        minimumInfoPrompt.employeeEmail,
        managerInformationPrompt.officeNumber
      );
      console.log(buildManager);
      break;
    case "Engineer":
      // run prompt for engineer related questionsa and build engineer obj
      break;
    case "Intern":
      // run prompt for intern related questions and build intern obj
      break;
  }
};

init();
