import RoomRepository, { RoomDTO } from "@repositories/RoomRepository";
import createUrlParams from "@helpers/createUrlParams";

export interface Room {
  _id: string;
  name: string;
  type: string;
  propertyName?: string;
  pricePerNight: number;
  roomSize: number;
  totalAvailableRoomsByType: number;
  description: string;
  roomFacilities: string[];
  bathroomFacilities: string[];
  viewFacilities: string;
  mealFacilities: string;
  bedFacilities: string[];
  adultCount: number;
  childCount: number;
  imageUrls: string[];
 
}

export type SearchParamsType = {
  propertyId?: string;
  roomName?: string;
  page?: string;
};

const objRoomRepository = new RoomRepository<RoomDTO>();

export const searchAvailableRoomsByPropertyId = (
  searchParams: SearchParamsType
) => {
  const queryParams = createUrlParams(searchParams);
  objRoomRepository.endpoint = `/available?${queryParams}`;
  const data = objRoomRepository.getMany();
  return data;
};

// FOR ADMIN

export const getRoomForAdmin = async (id: string) => {
  const data = objRoomRepository.get(id);
  return data;
};

export const createRoomWithFile = (formData: FormData) => {
  const data = objRoomRepository.createWithFile(formData);
  return data;
};

export const updateRoomWithFile = (formData: FormData) => {
  const id = `${formData.get("id")}`;
  const data = objRoomRepository.updateWithFile(id, formData);
  return data;
};

export const deleteRoom = (id: string) => {
  const data = objRoomRepository.delete(id);
  return data;
};
