import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { BugSchema } from '../models/Bug.js';
import { NotesSchema } from '../models/Note.js';
import { TrackedBugsSchema } from '../models/TrackedBug.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  Bugs = mongoose.model('Bug', BugSchema);

  Notes = mongoose.model('Note', NotesSchema);

  TrackedBugs = mongoose.model('TrackedBug', TrackedBugsSchema)

}

export const dbContext = new DbContext()
