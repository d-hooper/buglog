import { Auth0Provider } from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService.js";
import BaseController from "../utils/BaseController.js";

export class NotesController extends BaseController {

  constructor() {
    super('api/notes');
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
      .delete('/:noteId', this.deleteNote)
  }



  /**
 * Creates a new value from request body and returns the value
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
  async createNote(request, response, next) {
    try {
      const noteData = request.body
      const userInfo = request.userInfo
      noteData.creatorId = userInfo.id
      const note = await notesService.createNote(noteData)
      response.send(note)
    } catch (error) {
      next(error)
    }
  }

  /**
 * Creates a new value from request body and returns the value
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
  async deleteNote(request, response, next) {
    try {
      const noteId = request.params.noteId
      const userInfo = request.userInfo
      const message = await notesService.deleteNote(noteId, userInfo)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}