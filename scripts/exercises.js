#!/usr/bin/env node

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

async function getInfos() {
  const infos = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Exercise name",
    },
    {
      type: "input",
      name: "description",
      message: "Exercise description",
    },
    {
      type: "input",
      name: "video",
      message: "Enter the video url",
    },
    {
      type: "input",
      name: "thumbnail",
      message: "Enter the thumbnail url",
    },
    {
      type: "select",
      name: "muscleGroup",
      message: "Muscle group",
      choices: [
        "SHOULDERS",
        "CHEST",
        "BACK",
        "BICEPS",
        "TRICEPS",
        "ABS",
        "LEGS",
        "GLUTES",
        "CALF",
        "CARDIO",
        "FULL_BODY",
        "OTHER",
      ],
    },
    {
      type: "input",
      name: "met",
      message: "Enter the met",
      default: 3
    },
  ]);

  return infos;
}

async function main() {
  const url = await getUrl();
  const exercise = await getInfos();

  const response = await fetch(`${url}/exercises-library`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exercise),
  });

  const data = await response.json();
  console.log(data);
}

main();
