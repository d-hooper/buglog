import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

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

  async deleteNote(noteId, userInfo) {
    const noteToDelete = await dbContext.Notes.findById(noteId)

    // getting a 403 if this is included?
    // if (noteToDelete.creatorId != userInfo.userId) {
    //   throw new Forbidden("Can not delete bugs created by other users!");
    // }

    await noteToDelete.deleteOne()

    return 'Note was deleted.'
  }
}

export const notesService = new NotesService()