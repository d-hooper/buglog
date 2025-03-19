import { dbContext } from "../db/DbContext.js"

class NotesService {

  async createNote(noteData) {
    const note = await dbContext.Notes.create(noteData)
    await note.populate('creator')

    return note
  }

  async getNotesByBugId(bugId) {

    const notes = await dbContext.Notes.find({ bugId: bugId })

    return notes
  }

}

export const notesService = new NotesService()