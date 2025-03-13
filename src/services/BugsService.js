import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class BugsService {

  async getAllBugs() {
    const bugs = await dbContext.Bugs.find().populate('creator')
    return bugs
  }
  async getBugbyId(bugId) {
    const bug = await dbContext.Bugs.findById(bugId).populate('creator')
    return bug
  }
  async updateBug(bugId, userId, bugData) {
    const bug = await this.getBugbyId(bugId)

    if (bug.creatorId != userId) {
      throw new Forbidden("Can not delete bugs created by other users!");
    }
    bug.title = bugData.title
    bug.description = bugData.description
    await bug.save()


    return bug
  }

  async createBug(bugData) {
    const bug = (await dbContext.Bugs.create(bugData)).populate('creator')
    return bug
  }

}

export const bugsService = new BugsService()