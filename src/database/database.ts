import * as Mongoose from "mongoose"

export const connect = () => {
  const MONGO_URI: string = process.env.MONGO_URI || ''

  if (!MONGO_URI) {
    throw new Error("No MONGO_URI on environment variables")
  }

  Mongoose.connect(MONGO_URI)
    .then(() => console.log(`Connected to database ${MONGO_URI}`))
    .catch((error) => console.log(error))
}
