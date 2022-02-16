import mongoose, { connect } from 'mongoose'

export const connectDB = async () => {
  try {
    //console.log(process.env.MONGODB_URI!)
    await mongoose.connect(process.env.MONGODB_URI!)
    //console.log(connection)
    console.log('Connected To DB')
  } catch (error: any) {
    console.log('Failed to connect to DB: ' + error.message)
  }
}
