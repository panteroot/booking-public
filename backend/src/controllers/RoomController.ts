import { Request, Response } from "express";
import { searchPaginatedRoomsForAdmin } from "../services/SearchRoomAdminService";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
} from "../services/RoomService";
import logger from "../utils/logger";
import { RoomInput } from "models/Room";
import { RoomValidation } from "schemas/RoomSchema";

export const searchRoomsByPropertyHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    let sortOptions = {};

    const limit = 5;
    const skip = (pageNumber - 1) * limit;

    switch (req.query.sortOption) {
      case "nameAsc":
        sortOptions = { name: 1 };
        break;
      case "nameDesc":
        sortOptions = { name: -1 };
        break;
      default:
        sortOptions = { name: 1 };
    }
    const rooms = await searchRoomsByProperty(
      req.query,
      pageNumber,
      sortOptions,
      limit,
      skip
    );
    return res.send(rooms);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e.message);
  }
};

export const getAvailableRoomsByPropertyIdHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const propertyId = req.query.propertyId as string;

    const rooms = await getAvailableRoomsByPropertyId(propertyId, req.query);
    return res.send(rooms);
  } catch (e: any) {
    logger.error(e);
    return res.status(500).send(e.message);
  }
};

export const searchPaginatedRoomsForAdminHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const propertyId = req.query.propertyId as string;
    const roomType = req.query.roomType as string; // this can also refer to roomName if type is N/A
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );

    const limit = 5;
    const skip = (pageNumber - 1) * limit;

    const rooms = await searchPaginatedRoomsForAdmin(
      propertyId,
      roomType,
      pageNumber,
      skip,
      limit
    );
    return res.send(rooms);
  } catch (e: any) {
    logger.error(e);
    return res.status(404).send(e.message);
  }
};

export const getRoomHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const room = await getRoom(id);
    if (!room) return res.sendStatus(404);

    return res.send(room);
  } catch (e: any) {
    logger.error(e);
    return res.status(404).send(e.message);
  }
};

export const createRoomHandler = async (
  req: Request<{}, {}, RoomValidation["body"]>,
  res: Response
) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const roomFormData: RoomInput = req.body;

    const room = await createRoom(imageFiles, roomFormData);
    if (!room) return res.sendStatus(404);

    return res.send(room);
  } catch (e: any) {
    logger.error(e);
    return res.status(404).send(e.message);
  }
};

export const updateRoomHandler = async (
  req: Request<{ id: string }, {}, RoomValidation["body"]>,
  res: Response
) => {
  try {
    const roomId = req.params.id;
    const imageFiles = req.files as Express.Multer.File[];
    const roomFormData: RoomInput = req.body;

    const room = await updateRoom(roomId, imageFiles, roomFormData);

    if (!room) return res.sendStatus(404);

    return res.send(room);
  } catch (e: any) {
    logger.error(e);
    return res.status(404).send(e.message);
  }
};

export const deleteRoomHandler = async (req: Request, res: Response) => {
  try {
    const roomId = req.params.id;

    const room = await deleteRoom(roomId);

    if (!room) return res.sendStatus(404);

    return res.send(room);
  } catch (e: any) {
    logger.error(e);
    return res.status(404).send(e.message);
  }
};
