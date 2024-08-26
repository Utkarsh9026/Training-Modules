import mongoose from "mongoose";
import bcrypt from "bcrypt";

//progressSchema
const progressSchema = mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: true,
  },
  watchedDuration: {
    type: Number,
    default: 0,
  },
  completed: {
    type: Boolean,
    dafault: false,
  },
  lastAccessed: {
    type: Date,
    default: Date.now,
  },
});

//userSchema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 255,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 1024,
  },
  role: {
    type: String,
    enum: ["employee", "admin"],
    default: "employee",
  },
  progress: [],
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Compare password for authentication
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("users", userSchema);
