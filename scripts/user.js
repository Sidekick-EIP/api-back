#!/usr/bin/env node

import readline from "readline";
import inquirer from "inquirer";
import fetch from "node-fetch";

async function getUrl() {
  const { url } = await inquirer.prompt([
    {
      type: "list",
      name: "url",
      message: "Choose a URL",
      choices: ["http://localhost:8080", "https://api.sidekickapp.live"],
    },
  ]);
  return url;
}

async function getBasicUser() {
  const user = await inquirer.prompt([
    {
      type: "input",
      name: "email",
      message: "Enter your email",
    },
    {
      type: "input",
      name: "password",
      message: "Enter your password",
      default: "@Bonjour1",
    },
  ]);
  return user;
}

async function getInfos() {
  const infos = await inquirer.prompt([
    {
      type: "input",
      name: "firstname",
      message: "Enter your firstname",
      default: "John",
    },
    {
      type: "input",
      name: "lastname",
      message: "Enter your lastname",
      default: "Doe",
    },
    {
      type: "input",
      name: "description",
      message: "Enter your description",
      default: "I'm a cool guy",
    },
    {
      type: "input",
      name: "birth_date",
      message: "Enter your birthDate",
      default: "2001-03-10T00:00:00.000Z",
    },
    {
      type: "input",
      name: "size",
      message: "Enter your size",
      default: 180,
    },
    {
      type: "input",
      name: "weight",
      message: "Enter your weight",
      default: 80,
    },
    {
      type: "input",
      name: "goal_weight",
      message: "Enter your goal weight",
      default: 90,
    },
    {
      type: "input",
      name: "level",
      message: "Enter your levek",
      default: "ADVANCED",
    },
    {
      type: "input",
      name: "gender",
      message: "Enter your gender",
      default: "MALE",
    },
    {
      type: "input",
      name: "goal",
      message: "Enter your goal",
      default: "STAY_IN_SHAPE",
    },
    {
      type: "input",
      name: "activities",
      message: "Enter your activities",
      default: ["TENNIS", "SOCCER"],
    }
  ]);

  return infos;
}

async function main() {
  const url = await getUrl();
  const user = await getBasicUser();
  const infos = await getInfos();

  const response = await fetch(`${url}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  const response2 = await fetch(`${url}/user_infos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${data.access_token}`,
    },
    body: JSON.stringify(infos),
  });

  const data2 = await response2.json();

  console.log(data2);
}

main();
