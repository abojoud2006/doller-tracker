import { Schema, model, models } from "mongoose";

const goalSchema = new Schema({
  user: { type: String, required: true },
  userName: { type: String },
  target: { type: String, required: true, default: "36600" },
  dailyAmount: { type: String, required: true, default: "100" },
  currency: { type: String, default: "$" },
});

const Goal = models?.Goal || model("Goal", goalSchema);

export default Goal;
