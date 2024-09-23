import mongoose from "mongoose";
import Room, { RoomInput } from "../models/Room";

type PaginatedRoom = {
  data: RoomInput[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

const makeSearchQuery = (id: string, roomType: string) => {
  let searchQuery: any = {};

  if (id !== "" && id !== undefined) {
    const propertyId = new mongoose.Types.ObjectId(id.toString());
    searchQuery.refTo = { property: propertyId };
  }

  if (roomType !== "" && roomType !== undefined) {
    searchQuery = {
      $or: [
        { type: new RegExp(roomType, "i") },
        { name: new RegExp(roomType, "i") },
      ],
    };
  }

  return searchQuery;
};

export const searchPaginatedRoomsForAdmin = async (
  propertyId: string,
  roomType: string,
  pageNumber: number,
  skip: number,
  limit: number
) => {
  try {
    if (
      propertyId !== "" &&
      propertyId !== undefined &&
      !mongoose.Types.ObjectId.isValid(propertyId)
    )
      throw new Error("Invalid id!");

    const searchQuery = makeSearchQuery(propertyId, roomType);

    let queryRoom: any;
    let rooms;

    queryRoom = [
      {
        $lookup: {
          from: "properties",
          localField: "refTo.property",
          foreignField: "_id",
          as: "propertyData",
        },
      },
      { $unwind: "$propertyData" },
      { $skip: skip },
      { $limit: limit },
    ];

    // Conditionally add the $match stage if searchQuery is not empty
    if (Object.keys(searchQuery).length > 0) {
      queryRoom.unshift({ $match: { $and: [searchQuery] } });
    }

    rooms = await Room.aggregate(queryRoom);
    // remove the limit and skip
    queryRoom.pop();
    queryRoom.pop();
    const total = (await Room.aggregate(queryRoom)).length;

    const response: PaginatedRoom = {
      data: rooms,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / limit),
      },
    };

    return response;
  } catch (e: any) {
    throw new Error(e.message || "An error occurred during room search!");
  }
};
