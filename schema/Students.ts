import { IDataObject } from './../data/posts'
import { Schema, model, models } from 'mongoose'

export interface IStudent extends IDataObject {
  voted: boolean
  otp: number
}

const studentSchema = new Schema<IStudent>(
  {
    matric: {
      type: String,
      required: true,
      unique: true,
    },
    nick_name: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    voted: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

const Student = models.Student || model<IStudent>('Student', studentSchema)

export default Student
