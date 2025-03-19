import { dbContext } from "../db/DbContext.js"

class TrackedBugsService {

  async getTrackedBugsByBugId(bugId) {
    const trackedBugs = await dbContext.TrackedBugs.find({ bugId: bugId }).populate('tracker bug')
  }

  async createTrackedBug(trackedBugData) {
    const trackedBug = await dbContext.TrackedBugs.create(trackedBugData)
    await trackedBug.populate('tracker bug')
    return trackedBug
  }



}

export const trackedBugsService = new TrackedBugsService()