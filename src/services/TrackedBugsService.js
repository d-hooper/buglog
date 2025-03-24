import { dbContext } from "../db/DbContext.js"

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

}

export const trackedBugsService = new TrackedBugsService()