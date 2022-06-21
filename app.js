const notes = require('./notes.js');
const yargs = require('yargs');

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Title for the note to be added',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Body text for the note to be added',
      type: 'string'
    }
  },
  handler: (argv) => {
    notes.add(argv.title, argv.body);
  }
});

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Title for the note to be removed',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notes.remove(argv.title);
  }
});

yargs.command({
  command: 'get',
  describe: 'Get a note',
  builder: {
    title: {
      describe: 'Title for the note to be retrieved',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notes.get(argv.title);
  }
});

yargs.command({
  command: 'getall',
  describe: 'Get all notes',
  handler: () => {
    notes.getAll();
  }
});

yargs.parse();
