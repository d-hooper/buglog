import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class BugsService {

  async getAllBugs() {
    const bugs = await dbContext.Bugs.find().populate('creator')
    return bugs
  }

  async getBugbyId(bugId) {

    const bug = await dbContext.Bugs.findById(bugId).populate('creator')

    if (bug == null) {
      throw new BadRequest(`${bugId} is not a valid ID.`);
    }

    return bug
  }

  async updateBug(bugId, userId, bugData) {
    const bug = await this.getBugbyId(bugId)

    if (bug.creatorId != userId) {
      throw new Forbidden("Can not update bugs created by other users!");
    }

    bug.title = bugData.title ?? bug.title
    bug.description = bugData.description ?? bug.description

    await bug.save()

    return bug
  }

  async deleteBug(bugId, userInfo) {
    const bug = await this.getBugbyId(bugId)

    if (bug.creatorId != userInfo.id) {
      throw new Forbidden("Can not delete bugs created by other users!");
    }

    await bug.deleteOne()

    return `${bug.title} was successfully deleted.`
  }

  async createBug(bugData) {
    const bug = (await dbContext.Bugs.create(bugData)).populate('creator')
    return bug
  }

}

export const bugsService = new BugsService()