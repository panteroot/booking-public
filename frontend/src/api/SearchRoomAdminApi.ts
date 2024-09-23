import SearchRoomAdminRepository, {
  SearchRoomDTO,
  SearchRoomDataDTO,
} from "@repositories/SearchRoomAdminRepository";

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
  totalBookings: number;
}

export type SearchParamsType = {
  propertyId: string;
  roomName: string;
  page: string;
};

const parsePaginatedRooms = (response: SearchRoomDTO): Promise<SearchRoom> => {
  let result: SearchRoom;
  let rooms: RoomData[] | [];

  if (response.data != undefined) {
    rooms = response.data.map((room: SearchRoomDataDTO) => {
      return {
        _id: room._id,
        name: room.name,
        propertyName: room.propertyData.name,
        roomSize: room.roomSize,
        pricePerNight: room.pricePerNight,
        type: room.type,
        viewFacilities: room.facilities.view,
        mealFacilities: room.facilities.meal,
        bedFacilities: room.facilities.bed,
        totalAvailableRooms: room.totalAvailableRooms,
        adultCount: room.adultCount,
        childCount: room.childCount,
        totalBookings: room.totalBookings,
      };
    });
  } else {
    rooms = [];
  }

  if (response.data) {
    result = {
      rooms: rooms,
      totalPages: response.pagination.pages,
      totalItems: response.pagination.total,
      currentPage: response.pagination.page,
    };
  }

  return new Promise((resolve) => {
    resolve(result);
  });
};

const objRepository = new SearchRoomAdminRepository();

export const searchRoomsForAdmin = (
  propertyId: string,
  roomType: string,
  page: number
) => {
  const queryParams = new URLSearchParams();
  queryParams.append("propertyId", propertyId);
  queryParams.append("roomType", roomType);
  queryParams.append("page", page.toString());

  objRepository.endpoint = `/search?${queryParams}`;
  const data = objRepository.getPagination().then(parsePaginatedRooms);
  return data;
};
