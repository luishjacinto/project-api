import dotenv from 'dotenv'
import app from './app'
import { database } from './database'

dotenv.config()

const PORT = process.env.PORT

if (!PORT) {
    throw new Error("No PORT on environment variables")
}

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

database.connect()