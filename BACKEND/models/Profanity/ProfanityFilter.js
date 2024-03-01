import { Schema, model } from "mongoose";

const profanityFilterSchema = new Schema({
  bannedWords: [String],
});
const ProfanityFilter = model("ProfanityFilter", profanityFilterSchema);

export default ProfanityFilter;
