import { Schema, model, models } from "mongoose";

const pointSchema = new Schema({
  user: { type: String, required: true },
  userName: { type: String },
  year: { type: String, required: true },
  month: { type: String, required: true },
  points: [String],
});

const Point = models?.Point || model("Point", pointSchema);

export default Point;
