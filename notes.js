const fs = require("fs");
const chalk = require("chalk");

const getNote = (title) => {
  const data = loadNotes();
  const note = data.find((note) => note.title === title);
  if (note) {
    console.log(chalk.green.inverse("NoteFound:)"));
    console.log(chalk.magenta(note.title) + "\n" + note.body);
  } else {
    console.log(chalk.red.inverse("Note not Found :("));
  }
};

const addNotes = (props) => {
  const existingData = loadNotes();
  const duplicate = existingData.find((note) => note.title === props.title);
  if (!duplicate) {
    existingData.push({
      title: props.title,
      body: props.body,
    });
    saveNotes(existingData);
    console.log(chalk.green("Note added:)"));
  } else {
    console.log(chalk.red("Note not added:(") + "\nTitle is taken!");
  }
};

const removeNote = (title) => {
  const existingData = loadNotes();
  const alteredData = existingData.filter((note) => note.title != title);
  if (alteredData.length === existingData.length) {
    console.log(chalk.red("No such note found:("));
  } else {
    saveNotes(alteredData);
    console.log(chalk.green("Note deleted successfully:)"));
  }
};

const listNotes = () => {
  const data = loadNotes();
  console.log(chalk.blue.inverse("Your notes are:-"));
  data.forEach((element) => {
    console.log(element.title);
  });
};

const saveNotes = (data) => {
  fs.writeFileSync("notes.json", JSON.stringify(data));
};

const loadNotes = () => {
  try {
    return JSON.parse(fs.readFileSync("notes.json").toString());
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNote: getNote,
  addNotes: addNotes,
  removeNote: removeNote,
  listNotes: listNotes,
};
