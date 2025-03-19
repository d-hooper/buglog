import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { trackedBugsService } from "../services/TrackedBugsService.js";

export class TrackedBugsController extends BaseController {
  constructor() {
    super('api/trackedbugs');
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTrackedBug)
  }

  /**
 * Creates a new value from request body and returns the value
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
  async createTrackedBug(request, response, next) {
    try {
      const trackedBugData = request.body
      const trackedBug = await trackedBugsService.createTrackedBug(trackedBugData)
      response.send(trackedBug)
    } catch (error) {
      next(error)
    }
  }
}