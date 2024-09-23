import SearchRoomAdminRepository from "@repositories/SearchRoomAdminRepository";
import createUrlParams from "@helpers/createUrlParams";

export interface SearchRoom {
  rooms: RoomData[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

// use in PropertyCard view
export interface RoomData {
  _id: string;
  name: string;
  propertyName: string;
  roomSize: string;
  pricePerNight: number;
  type: string;
  viewFacilities: string;
  mealFacilities: string;
  bedFacilities: string[];
  totalAvailableRooms: number;
  adultCount: number;
  childCount: number;
}

export type SearchParamsType = {
  propertyId: string;
  roomName: string;
  page: string;
};

const objRepository = new SearchRoomAdminRepository();

export const searchRoomsForAdmin = (searchParams: SearchParamsType) => {
  const queryParams = createUrlParams(searchParams);
  objRepository.endpoint = `/search?${queryParams}`;
  const data = objRepository.getPagination();
  return data;
};
