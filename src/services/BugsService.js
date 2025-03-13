import { dbContext } from "../db/DbContext.js"

class BugsService {

  async createBug(bugData) {
    const bug = (await dbContext.Bugs.create(bugData)).populate('creator')
    return bug
  }

}

export const bugsService = new BugsService()