import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  name: {
    type: String,
    unquie: [true, "Name Already Added"],
    min: [2, "Name too short"],
    max: [50, "Name too long"],
    required: [true, "Name is required"],
  },
  data: {
    type: Array,
    trim: true,
    required: [true, "Data is required"],
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("File", FileSchema);
