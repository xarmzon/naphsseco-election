import { IDataObject } from '../data/posts'
import { Schema, model, models } from 'mongoose'

export interface IVoting extends IDataObject {
  count: number
  post: string
}

const voteSchema = new Schema<IVoting>(
  {
    matric: {
      type: String,
      required: true,
    },
    nick_name: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    post: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Vote = models.Vote || model<IVoting>('Vote', voteSchema)

export default Vote
