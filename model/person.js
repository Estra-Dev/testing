import { Schema, model } from "mongoose";

const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
})

const Person = model("Person", personSchema)
export default Person