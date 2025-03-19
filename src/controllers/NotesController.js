import { Auth0Provider } from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService.js";
import BaseController from "../utils/BaseController.js";

export class NotesController extends BaseController {

  constructor() {
    super('api/notes');
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
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
  async getNotesByBugId(request, response, next) {
    try {
      const bugId = request.params.bugId
      const bug = await notesService.getNotesByBugId(bugId)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }
}