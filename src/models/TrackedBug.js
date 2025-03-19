import { Schema } from "mongoose";

export const TrackedBugsSchema = new Schema(
  {

    bugId: { type: Schema.ObjectId, required: true, ref: 'Bug' },
    accountId: { type: Schema.ObjectId, required: true, ref: 'Account' },

  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

TrackedBugsSchema.virtual('tracker', {
  ref: 'Account',
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  options: {
    select: 'name picture'
  }
})

TrackedBugsSchema.virtual('bug', {
  ref: 'Bug',
  localField: 'bugId',
  foreignField: '_id',
  justOne: true,
})