import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import Person from "./model/person.js"

const app = express()

mongoose.set("strictQuery", false)
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`MongoDB is connected: ${conn.connection.host}`)
  } catch (error) {
    console.log("cannot connect", error)
  }
}

const PORT = process.env.PORT || 8000

app.get("/add-person", async (req, res) => {
  try {
    await Person.insertMany([
      {
        name: "Emeka",
        age: 32
      },
      {
        name: "John",
        age: 27
      }
    ])
    res.send("Person(s) added")
  } catch (error) {
    console.log(error, "cannot add Person")
  }
})

app.get("/persons", async (req, res) => {
  try {
    const person = await Person.find({})
    res.json(person)
  } catch (error) {
    console.log(error, "cannot fetch")
  }
})

app.get("/", (req, res) => {
  res.send({"Text": "Welcome"})
})


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
})