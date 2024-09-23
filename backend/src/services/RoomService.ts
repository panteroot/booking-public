import Room, { RoomInput } from "../models/Room";
import { uploadImagesToCloudinary } from "../helpers/uploadImages";
import mongoose from "mongoose";

export const getRoom = async (roomId: string) => {
  const room = await Room.findById(roomId)
    .populate({ path: "refTo.property", select: "name" })
    .exec();

  return room;
};

export const createRoom = async (
  imageFiles: Express.Multer.File[],
  roomFormData: RoomInput
) => {
  try {
    //* upload images
    const imageUrls = await uploadImagesToCloudinary(imageFiles);
    roomFormData.imageUrls = imageUrls;

    const room = new Room(roomFormData);
    await room.save();
    return room;
  } catch (e: any) {
    throw new Error(e.message || "An error occurred during room creation!");
  }
};

export const updateRoom = async (
  id: string,
  imageFiles: Express.Multer.File[],
  roomFormData: RoomInput
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid id!");

    // update text values first
    const room = await Room.findOneAndUpdate({ _id: id }, roomFormData, {
      new: true,
    });

    if (!room) throw new Error("Room not found!");

    //* upload images
    const currentImageUrls = await uploadImagesToCloudinary(imageFiles);
    room.imageUrls = [
      ...currentImageUrls,
      ...(roomFormData.imageUrls || []), // append the previous imageUrls, if deleted then just append empty array
    ];

    await room.save();
    return room;
  } catch (e: any) {
    throw new Error(e.message || "An error occurred during room modification!");
  }
};

export const deleteRoom = async (id: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid id!");

    const room = await Room.findOneAndDelete({ _id: id });

    if (!room) throw new Error("Room not found!");

    return true;
  } catch (e: any) {
    throw new Error(e.message || "An error occurred during room deletion!");
  }
};
