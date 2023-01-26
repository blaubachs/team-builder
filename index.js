const fs = require("fs");
const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const genHtml = require("./util/generateHtml");

const init = async () => {
  const initPrompt = await inquirer.prompt([
    {
      type: "list",
      message: "What position is this employee in?",
      choices: ["Manager", "Engineer", "Intern"],
      name: "employeeType",
    },
  ]);
};

init();
