import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import config from "config";
import PasswordValidator from "password-validator";

export interface UserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  contacts: {
    phone: number;
    mobile: number;
  };
  address: string;
  country: string;
  city: string;
  zipcode: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   default: () => new mongoose.Types.ObjectId(),
    // },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contacts: {
      phone: Number,
      mobile: { type: Number, required: true },
    },
    address: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // TODO fix typing
  const user = this; //as UserDocument;

  const passwordSchema = new PasswordValidator();

  // Define password policy
  passwordSchema
    .is()
    .min(6)
    .is()
    .max(100)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits()
    .has()
    .not()
    .spaces()
    .is()
    .not()
    .oneOf(["password", "123456", "qwerty"]); // Blacklist

  // basically everytime User.create is called all input fields are modified since
  // all initial set value will be considered modified
  if (this.isModified("password")) {
    const passwordValidation = passwordSchema.validate(user.password);
    if (!passwordValidation) {
      return next(new Error("Password does not meet complexity requirements!"));
    }

    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
  next();
});

userSchema.methods.comparePassword = async function (
  inputPassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(inputPassword, user.password).catch((e) => false);
};

userSchema.statics.signin = async function (email, password) {
  if (!email || !password) throw Error("Pls fill in all fields!");

  const user = await this.findOne({ email });

  if (!user) throw Error("Incorrect email!");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw Error("Incorrect password!");

  return user;
};

export default mongoose.model<UserDocument>("User", userSchema);
