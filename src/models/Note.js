import { Schema } from "mongoose";

export const NotesSchema = new Schema({

  body: { type: String, minLength: 5, maxLength: 500, required: true },
  bugID: { type: Schema.ObjectId, required: true, ref: 'Bug' },
  creatorID: { type: Schema.ObjectId, required: true, ref: 'Account' },
},
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

NotesSchema.virtual('creator', {
  ref: 'Account',
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  options: {
    select: 'name picture'
  }
})