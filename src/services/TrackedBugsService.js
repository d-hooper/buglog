import { dbContext } from "../db/DbContext.js"

class TrackedBugsService {
  async createTrackedBug(trackedBugData) {
    const trackedBug = await dbContext.TrackedBugs.create(trackedBugData)
    await trackedBug.populate('tracker bug')
    return trackedBug
  }



}

export const trackedBugsService = new TrackedBugsService()