import { Schema, model, models } from "mongoose";

const goalSchema = new Schema({
  user: { type: String, required: true },
  target: { type: String, required: true },
  currency: { type: String, default: "$" },
});

const Goal = models?.Goal || model("Goal", goalSchema);

export default Goal;
