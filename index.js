const fs = require("fs");
const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const genHtml = require("./util/generateHtml");
const managerCreated = false;
let engineerArr = [];
let internArr = [];

const init = async () => {
  let typeOfEmployeeFlag = "";
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

  const initPrompt = await inquirer.prompt([
    {
      type: "list",
      message: "What position is this employee in?",
      choices: ["Engineer", "Intern", "Quit"],
      name: "employeeType",
    },
  ]);
  typeOfEmployeeFlag = initPrompt.employeeType;
  console.log(`Employee type chosen is ${typeOfEmployeeFlag}.`);

  switch (typeOfEmployeeFlag) {
    case "Engineer":
      // run prompt for engineer related questionsa and build engineer obj
      const engineerInfoPrompt = await inquirer.prompt([
        {
          type: "input",
          message: "What is this engineer's github username?",
          name: "engineerGithub",
        },
        {
          type: "confirm",
          message: "Would you like to add another employee?",
          name: "confirmBool",
        },
      ]);
      const buildEngineer = new Engineer(
        minimumInfoPrompt.employeeName,
        minimumInfoPrompt.employeeId,
        minimumInfoPrompt.employeeEmail,
        engineerInfoPrompt.engineerGithub
      );
      engineerArr.push(buildEngineer);
      console.log(engineerArr);
      if (engineerInfoPrompt.confirmBool == true) {
        initPrompt();
      }
      break;
    case "Intern":
      // run prompt for intern related questions and build intern obj
      const internInfoPrompt = await inquirer.prompt([
        {
          type: "input",
          message: "What is this intern's school?",
          name: "internSchool",
        },
        {
          type: "confirm",
          message: "Would you like to add another employee?",
          name: "confirmBool",
        },
      ]);
      const buildIntern = new Intern(
        minimumInfoPrompt.employeeName,
        minimumInfoPrompt.employeeId,
        minimumInfoPrompt.employeeEmail,
        internInfoPrompt.internSchool
      );
      internArr.push(buildIntern);
      console.log(internArr);
      if (internInfoPrompt.confirmBool == true) {
        initPrompt();
      }
      break;
    case "Quit":
      console.log("generate here");
      break;
  }
};

init();
