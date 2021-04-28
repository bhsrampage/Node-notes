const chalk = require("chalk");
const yargs = require("yargs");
const { getNote, addNotes, removeNote, listNotes } = require("./notes");
const fs = require("fs");

yargs.version("1.1.1");

//Command for adding
yargs.command({
  command: "add",
  describe: "Add a new Note",
  builder: {
    title: {
      describe: "Note Title!",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string",
    },
  },
  handler: (args) => {
    addNotes({ title: args.title, body: args.body });
  }, //This is to perform the function
});

//command for removing

yargs.command({
  command: "remove",
  describe: "Removing a note",
  builder: {
    title: {
      describe: "Note Title!",
      demandOption: true,
      type: "string",
    },
  },
  handler: (args) => {
    removeNote(args.title);
  },
});

//command for list

yargs.command({
  command: "list",
  describe: "List all the notes",
  handler: () => listNotes(),
});

//commqand for read

yargs.command({
  command: "read",
  describe: "Reading a note!",
  builder: {
    title: {
      describe: "Note Title!",
      demandOption: true,
      type: "string",
    },
  },
  handler: (args) => getNote(args.title),
});

//console.log(yargs.argv);

yargs.parse();
