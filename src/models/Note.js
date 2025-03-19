import { Schema } from "mongoose";

export const NotesSchema = new Schema({

  body: { type: String, minLength: 5, maxLength: 500, required: true },
  bugId: { type: Schema.ObjectId, required: true, ref: 'Bug' },
  creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
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