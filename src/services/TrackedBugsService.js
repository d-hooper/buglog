import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TrackedBugsService {

  async getUsersTrackingByBugId(bugId) {
    const trackedBugs = await dbContext.TrackedBugs.find({ bugId: bugId }).populate('tracker bug')

    return trackedBugs
  }

  async getTrackedBugsByAccount(userId) {
    const bugs = await dbContext.TrackedBugs.find({ accountId: userId }).populate('bug')
    return bugs
  }

  async createTrackedBug(trackedBugData) {
    const trackedBug = await dbContext.TrackedBugs.create(trackedBugData)
    await trackedBug.populate('tracker bug')
    return trackedBug
  }

  async deleteTrackedBug(trackedBugId, userId) {
    const trackedBugToDelete = await (await dbContext.TrackedBugs.findById(trackedBugId)).populate('bug')

    if (!trackedBugToDelete) {
      throw new BadRequest(`No tracked bug found with an id of ${trackedBugId}`)
    }

    if (trackedBugToDelete.accountId != userId) {
      throw new Forbidden(`Cannot remove tracking links for other users`)
    }

    await trackedBugToDelete.deleteOne()
    // @ts-ignore
    return `No longer tracking ${trackedBugToDelete.bug.title}`

  }

}

export const trackedBugsService = new TrackedBugsService()