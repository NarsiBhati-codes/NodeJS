const fs = require("fs");
const { Command } = require("commander");
const path = require("path");
const program = new Command();

// Define the path for the TODO list file
const filePath = path.join(__dirname, "TODOLIST.JSON");

// CLI program setup
program
  .name("Todo Managing")
  .description("CLI for managing Todos")
  .version("0.1.0");

// Command to add a new todo
program
  .command("add")
  .description("Add a todo to the file")
  .argument("<title>", "Title of the todo")
  .argument("<description>", "Description of the todo")
  .action((title, description) => {
    // Read the existing todo list from file
    fs.readFile(filePath, "utf-8", (err, todo_list) => {
      if (err) {
        console.error(err);
        return;
      }

      // Parse the existing todo list
      let TODO_LIST_JSON = JSON.parse(todo_list);

      // Add new todo item
      TODO_LIST_JSON.push({
        title: title,
        description: description,
        isComplete: false,
      });

      // Write updated todo list back to file
      const TODO_LIST_String = JSON.stringify(TODO_LIST_JSON, null, 2);
      fs.writeFile(filePath, TODO_LIST_String, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Todo added successfully");
      });
    });
  });

// Command to load and display all todos
program
  .command("loadTodo")
  .description("Load and display all todos")
  .action(() => {
    // Read the existing todo list from file
    fs.readFile(filePath, "utf-8", (err, todo_list) => {
      if (err) {
        console.error(err);
        return;
      }

      // Parse and display the todo list
      let TODO_LIST_JSON = JSON.parse(todo_list);
      console.log(TODO_LIST_JSON);
    });
  });

// Command to remove a todo by title
program
  .command("remove")
  .description("Remove a todo from the list")
  .argument("<title>", "Title of the todo to remove")
  .action((title) => {
    // Read the existing todo list from file
    fs.readFile(filePath, "utf-8", (err, todo_list) => {
      if (err) {
        console.error(err);
        return;
      }

      // Parse the todo list
      let TODO_LIST_JSON = JSON.parse(todo_list);

      // Check if there are any todos
      if (TODO_LIST_JSON.length === 0) {
        console.log("There are no todos to remove");
        return;
      }

      // Remove the todo with the specified title
      let UPDATED_TODO_LIST_JSON = TODO_LIST_JSON.filter(
        (todo) => todo.title !== title
      );

      // Write the updated todo list back to file
      const UPDATED_TODO_LIST_STRING = JSON.stringify(
        UPDATED_TODO_LIST_JSON,
        null,
        2
      );
      fs.writeFile(filePath, UPDATED_TODO_LIST_STRING, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Todo removed with title: ${title}`);
      });
    });
  });

// Command to update the completion status of a todo
program
  .command("update")
  .description("Update the completion status of a todo")
  .argument("<title>", "Title of the todo to update")
  .argument("<isComplete>", "Completion status (true/false)")
  .action((title, isComplete) => {
    // Read the existing todo list from file
    fs.readFile(filePath, "utf-8", (err, todo_list) => {
      if (err) {
        console.error(err);
        return;
      }

      // Parse the todo list
      let TODO_LIST_JSON = JSON.parse(todo_list);

      // Check if there are any todos
      if (TODO_LIST_JSON.length === 0) {
        console.log("There are no todos to update");
        return;
      }

      // Update the completion status of the specified todo
      let foundTodo = false;
      TODO_LIST_JSON = TODO_LIST_JSON.map((todo) => {
        if (todo.title === title) {
          foundTodo = true;
          return { ...todo, isComplete: isComplete === "true" };
        }
        return todo;
      });

      // Check if the todo was found and updated
      if (!foundTodo) {
        console.log(`No todo found with title: ${title}`);
        return;
      }

      // Write the updated todo list back to file
      fs.writeFile(filePath, JSON.stringify(TODO_LIST_JSON, null, 2), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Todo updated with title: ${title}`);
      });
    });
  });

// Parse the command-line arguments
program.parse();
