import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface AdminInput {
  username: string;
  password: string;
}

export interface AdminDocument extends AdminInput, mongoose.Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(inputPassword: string): Promise<boolean>;
}

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   default: () => new mongoose.Types.ObjectId(),
    // },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

adminSchema.methods.comparePassword = async function (
  inputPassword: string
): Promise<boolean> {
  const user = this as AdminDocument;

  return bcrypt.compare(inputPassword, user.password).catch((e) => false);
};

export default mongoose.model<AdminDocument>("Admin", adminSchema);
