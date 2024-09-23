import mongoose from "mongoose";
import { PropertyDocument } from "./Property";
import { BookingDocument } from "./Booking";

export interface BookingDataInput {
  bookingId: BookingDocument["_id"];
  checkinDate: string;
  checkoutDate: string;
  roomQty: number;
  pricePerNight: number;
}

export interface RoomInput {
  // refTo: {
  //   property: PropertyDocument["_id"];
  // };
  "refTo.property": PropertyDocument["_id"];
  name: string;
  type: string;
  pricePerNight: number;
  roomSize: number;
  noPhysicalRooms: number;
  noAvailableRooms: number;
  roomStatus: string;
  description: string;
  // facilities: {
  //   room: string[];
  //   bathroom: string[];
  //   view: string;
  //   meal: string;
  //   bed: string[];
  // };

  "facilities.room": string[];
  "facilities.bathroom": string[];
  "facilities.view": string;
  "facilities.meal": string;
  "facilities.bed": string[];

  adultCount: number;
  childCount: number;
  imageUrls?: string[];
  bookingData?: BookingDataInput[];
}

export interface RoomDocument extends RoomInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const Schema = mongoose.Schema;

const bookingDataSchema = new Schema({
  bookingId: { type: String, required: true },
  checkinDate: { type: Date, required: true },
  checkoutDate: { type: Date, required: true },
  roomQty: { type: Number, required: true },
  pricePerNight: { type: Number, required: true },
});

const roomSchema = new Schema(
  {
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   default: () => new mongoose.Types.ObjectId(),
    // },
    refTo: {
      property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    },

    bookingData: [bookingDataSchema],
    name: { type: String, required: true },
    type: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    roomSize: { type: Number, required: true },
    noPhysicalRooms: { type: Number, required: true },
    noAvailableRooms: { type: Number, required: true },
    roomStatus: { type: String, required: true },
    description: { type: String, required: true },
    facilities: {
      room: { type: [String], required: true },
      bathroom: { type: [String], required: true },
      view: { type: String, required: true },
      meal: { type: String, required: true },
      bed: { type: [String], required: true },
    },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    imageUrls: [String],
  },
  { timestamps: true }
);

export default mongoose.model<RoomDocument>("Room", roomSchema);
