import { BaseRepository } from "@repositories/BaseRepository";
import { PropertyDTO } from "./PropertyRepository";

export interface RoomDTO {
  _id: string;
  refTo: {
    property: PropertyDTO; //| string;
  };
  name: string;
  type: string;
  propertyData?: PropertyDTO; //will be returned if $lookup is use in query
  pricePerNight: number;
  roomSize: number;
  noPhysicalRooms: number;
  noAvailableRooms: number;
  roomStatus: string;
  totalAvailableRooms: number; // initial original no of rooms - booked rooms
  description: string;
  facilities: {
    room: string[];
    bathroom: string[];
    view: string;
    meal: string;
    bed: string[];
  };
  adultCount: number;
  childCount: number;
  imageUrls: string[];
  imageFiles?: FileList; // used in RoomForm in admin
  bookingData?: {
    bookingId: string;
    checkinDate: Date;
    checkoutDate: Date;
    roomQty: number;
    pricePerNight: number;
  }; // used in RoomForm in admin
}

class RoomRepository<T> extends BaseRepository<T> {
  collection = "api/rooms";
  endpoint = "";
  options = {
    withCredentials: true,
  };

  get(id: string) {
    return super.get(id);
  }

  getMany() {
    return super.getMany();
  }

  getPagination() {
    return super.getPagination();
  }

  create(data: T) {
    this.options.withCredentials = true;
    return super.post(data);
  }

  createWithFile(data: FormData) {
    this.options.withCredentials = true;
    return super.postWithFile(data);
  }

  updateWithFile(id: string, data: FormData) {
    return super.updateWithFile(id, data);
  }

  delete(id: string) {
    return super.delete(id);
  }
}

export default RoomRepository;
