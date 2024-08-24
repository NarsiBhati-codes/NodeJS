const fs = require("fs");
const { Command } = require("commander");
const path = require("path");
const program = new Command();

const filePath = path.join(__dirname, "TODOLIST.JSON");

program
  .name("Todo Managing")
  .description(`It's a CLI for managing Todos`)
  .version("0.1.0");

program
  .command("add")
  .description("add todo to File")
  .argument("<title>", "title of todo")
  .argument("<description>", "description of todo")
  .action((title, description) => {
    fs.readFile(filePath, "utf-8", (err, todo_list) => {
      if (err) {
        console.error(err);
        return;
      } else {
        let TODO_LIST_JSON = JSON.parse(todo_list);
        TODO_LIST_JSON.push({
          title: title,
          description: description,
          isComplete: false,
        });

        const TODO_LIST_String = JSON.stringify(TODO_LIST_JSON);
        fs.writeFile(filePath, TODO_LIST_String, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Todo added successfully");
        });
      }
    });
  });

program
  .command("loadTodo")
  .description("Load todo to File")
  .action((todo) => {
    fs.readFile(filePath, "utf-8", (err, todo_list) => {
      if (err) {
        console.error(err);
      } else {
        let TODO_LIST_JSON = JSON.parse(todo_list);
        console.log(TODO_LIST_JSON);
      }
    });
  });

program.parse();
