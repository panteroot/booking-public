import { BaseRepository } from "@repositories/BaseRepository";
import { PropertyDTO } from "./PropertyRepository";

export interface SearchRoomDTO {
  data: SearchRoomDataDTO[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}

export interface SearchRoomDataDTO {
  _id: string;
  name: string;
  propertyData: PropertyDTO;
  roomSize: string;
  pricePerNight: number;
  type: string;
  facilities: {
    view: string;
    meal: string;
    bed: string[];
  };
  totalAvailableRooms: number;
  adultCount: number;
  childCount: number;
  totalBookings: number;
}

class SearchRoomAdminRepository extends BaseRepository<SearchRoomDTO> {
  collection = "api/rooms";
  endpoint = "";
  options = {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };

  getPagination() {
    return super.getPagination();
  }
}

export default SearchRoomAdminRepository;
