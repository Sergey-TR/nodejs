#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const inquirer = require("inquirer");
const {
    Transform
} = require("stream");

const currentDirectory = process.cwd();

const isFile = (fileName) => fs.lstatSync(fileName).isFile();

const fileList = async (directory) => {
    const firstAnswer = await inquirer.prompt([{
        name: "fileName",
        type: "list",
        message: "Вы находитесь в директории " + directory + ". Выберите файл:",
        choices: fs.readdirSync(directory),
    }, ]);

    const newFilePath = path.join(directory, firstAnswer.fileName);

    if (!isFile(newFilePath)) return fileList(newFilePath);

    const secondAnswer = await inquirer.prompt([
        {
          name: "search",
          type: "input",
          message: "Введите строку для поиска (опционально):",
        },
      ]);
      
      const regExp = new RegExp("^.*" + secondAnswer.search + ".*$", "gm");
      const readStream = fs.createReadStream(newFilePath, "utf-8");
    
      const transformStream = new Transform({
        transform(chunk, _encoding, callback) {
          const searchArray = chunk.toString().match(regExp);
          if (searchArray) {
            const transformedChunk = searchArray.join("\n");
            callback(null, transformedChunk);
          }
        },
      });
    
      if (secondAnswer.search) {
        readStream.pipe(transformStream).pipe(process.stdout);
      } else {
        readStream.pipe(process.stdout);
      }

};

const info = async () => {
    const directory = await inquirer.prompt([{
        name: "userDirectory",
        type: "input",
        message: "Вы находитесь в директории " + currentDirectory +
            " \n если хотите просмотреть файлы в текущей директории нажмите ENTER" +
            " \n в другой директории, введите путь:"
    }, ]);

    if (!directory.userDirectory) {
        const options = yargs.option("d", {
            alias: "directory",
            describe: "Путь до папки",
            type: "string",
            default: process.cwd(),
        }).argv;

        fileList(options.directory);

    } else {
        const dir = path.join(currentDirectory, directory.userDirectory);

        fileList(dir);
    }

};

info();