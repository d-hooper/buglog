import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService.js";
import BaseController from "../utils/BaseController.js";
import { notesService } from "../services/NotesService.js";

export class BugsController extends BaseController {

  constructor() {
    super('api/bugs');
    this.router
      .get('', this.getAllBugs)
      .get('/:bugId', this.getBugById)
      .get('/:bugId/notes', this.getNotesByBugId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put('/:bugId', this.updateBug)
      .post('', this.createBug)
      .delete('/:bugId', this.deleteBug)

  }

  /**
  * Creates a new value from request body and returns the value
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */
  async getAllBugs(request, response, next) {
    try {

      const bugs = await bugsService.getAllBugs()
      response.send(bugs)
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
  async getBugById(request, response, next) {
    try {
      const bugId = request.params.bugId
      const bug = await bugsService.getBugById(bugId)
      response.send(bug)
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

  /**
   * Creates a new value from request body and returns the value
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
  */
  async createBug(request, response, next) {
    try {
      const userInfo = request.userInfo
      const bugData = request.body
      bugData.creatorId = userInfo.id
      const bug = await bugsService.createBug(bugData)
      response.send(bug)
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
  async updateBug(request, response, next) {
    try {
      const bugId = request.params.bugId
      const bugData = request.body
      const userId = request.userInfo.id
      bugData.userId = request.userInfo.id
      const bug = await bugsService.updateBug(bugId, userId, bugData)
      response.send(bug)
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
  async deleteBug(request, response, next) {
    try {
      const bugId = request.params.bugId
      const userInfo = request.userInfo

      const message = await bugsService.deleteBug(bugId, userInfo)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}