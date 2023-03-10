const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const genHtml = require("./util/generateHtml");
const fsWritePromisify = util.promisify(fs.writeFile);
let teamArr = [];

// init the program prompting the user for the manager's information.
const managerPromptInit = async () => {
  const managerInformationPrompt = await inquirer.prompt([
    {
      type: "input",
      message: "What is the manager's name?",
      name: "managerName",
    },
    {
      type: "number",
      message: "What is the manager's employee ID?",
      name: "managerId",
    },
    {
      type: "input",
      message: "What is the manager's email?",
      name: "managerEmail",
    },
    {
      type: "number",
      message: "What is the office number for this manager?",
      name: "officeNumber",
    },
  ]);
  const buildManager = await new Manager(
    managerInformationPrompt.managerName,
    managerInformationPrompt.managerId,
    managerInformationPrompt.managerEmail,
    managerInformationPrompt.officeNumber
  );
  teamArr.push(buildManager);
  // run init() to prompt the user for engineers and interns
  init();
};

// recursive prompt function to build engineer and intern objects
const init = async () => {
  let typeOfEmployeeFlag = "";

  console.log(
    "The following lines will prompt you for employees you would like to add to your team."
  );
  const initPrompt = await inquirer.prompt([
    {
      type: "list",
      message: "What position is this employee in?",
      choices: ["Engineer", "Intern", "Quit"],
      name: "employeeType",
    },
  ]);

  typeOfEmployeeFlag = initPrompt.employeeType;
  // console.log(`Employee type chosen is ${typeOfEmployeeFlag}.`);

  switch (typeOfEmployeeFlag) {
    case "Engineer":
      // run prompt for engineer related questionsa and build engineer obj
      const engineerInfoPrompt = await inquirer.prompt([
        {
          type: "input",
          message: "What is this engineer's name?",
          name: "engineerName",
        },
        {
          type: "number",
          message: "What is this engineer's ID?",
          name: "engineerId",
        },
        {
          type: "input",
          message: "What is this engineer's email?",
          name: "engineerEmail",
        },
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
        engineerInfoPrompt.engineerName,
        engineerInfoPrompt.engineerId,
        engineerInfoPrompt.engineerEmail,
        engineerInfoPrompt.engineerGithub
      );
      teamArr.push(buildEngineer);
      if (engineerInfoPrompt.confirmBool == true) {
        // If the user says yes to create more employees, run the function again.
        init();
      } else {
        // Generate page with object created from user inputs.
        await fsWritePromisify(
          "./generated-page/index.html",
          genHtml(teamArr),
          (err) =>
            err
              ? console.log(err)
              : console.log(
                  "Check the directory './generated-page' for your team page."
                )
        );
      }
      break;
    case "Intern":
      // run prompt for intern related questions and build intern obj
      const internInfoPrompt = await inquirer.prompt([
        {
          type: "input",
          message: "What is this intern's name?",
          name: "internName",
        },
        {
          type: "number",
          message: "What is this intern's ID?",
          name: "internId",
        },
        {
          type: "input",
          message: "What is this intern's email?",
          name: "internEmail",
        },
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
        internInfoPrompt.internName,
        internInfoPrompt.internId,
        internInfoPrompt.internEmail,
        internInfoPrompt.internSchool
      );
      teamArr.push(buildIntern);
      if (internInfoPrompt.confirmBool == true) {
        // If the user says yes to create more employees, run the function again.
        init();
      } else {
        // Generate page with object created from user inputs.
        await fsWritePromisify(
          "./generated-page/index.html",
          genHtml(teamArr),
          (err) =>
            err
              ? console.log(err)
              : console.log(
                  "Check the directory './generated-page' for your team page."
                )
        );
      }
      break;
    case "Quit":
      await fsWritePromisify(
        "./generated-page/index.html",
        genHtml(teamArr),
        (err) =>
          err
            ? console.log(err)
            : console.log(
                "Check the directory './generated-page' for your team page."
              )
      );
      break;
  }
};

managerPromptInit();
