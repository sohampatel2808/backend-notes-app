const fs = require('fs');
const validator = require('validator');
const chalk = require('chalk');

const add = (title, body = '') => {
  if (validator.isEmpty(title)) {
    console.log(chalk.red.bold('Please provide title!'));
    return;
  }

  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title.toLowerCase() === title.toLowerCase());

  if (duplicateNote) {
    console.log(chalk.red.bold('Note already present!'));
    return;
  }

  notes.push({
    title: title,
    body: body
  });

  saveNotes(notes);

  console.log(chalk.green.bold('New note added!'));
}

const remove = (title) => {
  if (validator.isEmpty(title)) {
    console.log(chalk.red.bold('Please provide title!'));
    return;
  }

  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title.toLowerCase() !== title.toLowerCase());

  if (notes.length === notesToKeep.length) {
    console.log(chalk.red.bold('No note found!'));
    return;
  }

  saveNotes(notesToKeep);

  console.log(chalk.green.bold('Note removed!'));
}

const getAll = () => {
  const notes = loadNotes();

  if (notes.length === 0) {
    console.log(chalk.red.bold('No notes found!')); 
    return;
  }

  console.log(chalk.white.bold('Your Notes: '));
  notes.forEach(note => console.log('Title: ' + note.title + '\tBody: ' + note.body));
}

const get = (title) => {
  if (validator.isEmpty(title)) {
    console.log(chalk.red.bold('Please provide title!'));
    return;
  }

  const notes = loadNotes();
  const filteredNote = notes.find(note => note.title.toLowerCase() === title.toLowerCase());

  if (filteredNote === undefined) {
    console.log(chalk.red.bold('No note found!')); 
    return;
  }

  console.log(chalk.white.bold('Your Note: '));
  console.log('Title: ' + filteredNote.title + '\tBody: ' + filteredNote.body);
}

const loadNotes = function() {
  try {
    const dataBuffer = fs.readFileSync('./data/notes.json');
    return JSON.parse(dataBuffer.toString());
  } catch (ex) {
    return [];
  }
}

const saveNotes = function(notes) {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync('./data/notes.json', dataJson);
}

module.exports = {
  add: add,
  remove: remove,
  getAll: getAll,
  get: get
}
