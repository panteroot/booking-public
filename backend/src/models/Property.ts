import mongoose from "mongoose";

export interface PropertyInput {
  name: string;
  propertyType: string;
  address: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  imageUrls?: string[];
  description: string;
  featuredFacilities: string[];
  totalPhysicalRooms: number;
  totalAvailableRooms: number;
  propertyStatus: string;
  // facilities: {
  //   property: string[];
  //   view: string[];
  //   meal: string[];
  // };
  // rules: {
  //   checkin: string;
  //   checkout: string;
  //   damageDepositFee: string;
  //   pet: string;
  //   others: string;
  // };

  "facilities.property": string[];
  "facilities.view": string[];
  "facilities.meal": string[];
  "rules.checkin": string;
  "rules.checkout": string;
  "rules.damageDepositFee": string;
  "rules.pet": string;
  "rules.others": string;
}

export interface PropertyDocument extends PropertyInput, mongoose.Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   default: () => new mongoose.Types.ObjectId(),
    // },
    name: { type: String, required: true },
    propertyType: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    imageUrls: [{ type: String }],
    description: { type: String, required: true },
    featuredFacilities: [{ type: String, required: true }],
    totalPhysicalRooms: { type: Number, required: true },
    totalAvailableRooms: { type: Number, required: true },
    propertyStatus: { type: String, required: true },
    facilities: {
      property: [{ type: String, required: true }],
      view: [{ type: String, required: true }],
      meal: [{ type: String, required: true }],
    },
    rules: {
      checkin: { type: String, required: true },
      checkout: { type: String, required: true },
      damageDepositFee: { type: String, required: true },
      pet: { type: String, required: true },
      others: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model<PropertyDocument>("Property", propertySchema);
