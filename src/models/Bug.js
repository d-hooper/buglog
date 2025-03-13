import { Schema } from "mongoose";

export const BugSchema = new Schema({

  title: { type: String, minLength: 10, maxLength: 50, required: true },
  description: { type: String, minLength: 10, maxLength: 500, required: true },
  closed: { type: Boolean, required: true, default: false },
  closedDate: { type: Date, default: false },
  creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },

},
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

BugSchema.virtual('creator', {
  ref: 'Account',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true
})