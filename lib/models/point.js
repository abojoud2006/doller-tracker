import { Schema, model, models } from "mongoose";

const pointSchema = new Schema({
  user: { type: String, required: true },
  year: { type: String, required: true },
  month: { type: String, required: true },
  days: [String],
});

const Point = models?.Point || model("Point", pointSchema);

export default Point;
